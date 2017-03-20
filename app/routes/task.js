import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),
  disabled: null,
  setupController(controller){
    this._super(...arguments);
    controller.set('currentUser', this.modelFor('application').account.id);
  },
  actions: {
    contactSave(contactFields) {
      this.controller.set('isSync', true);
      const [homePhone, firstName, lastName, cellPhone, officePhone, skypeId, address, address_2, city, state, country, zipCode] = contactFields;
      this.store.findRecord('contact', this.currentModel.get('contact.id'))
        .then(contact => {
          contact.set('homePhone', homePhone);
          contact.set('skypeId', skypeId);
          contact.set('address', address);
          contact.set('address_2', address_2);
          contact.set('city', city);
          contact.set('state', state);
          contact.set('country', country);
          contact.set('zipCode', zipCode);
          contact.set('cellPhone', cellPhone);
          contact.set('officePhone', officePhone);
          contact.set('firstName', firstName);
          contact.set('lastName', lastName);
          contact.save().then(() => {
            this.get('notify').success(`Contact ${firstName} ${lastName} successfully updated`);
            this.controller.set('isSync', false);
          });
        })
        .catch(e => {
          this.get('notify').error(e.message);
          this.controller.set('isSync', false);
        });
    },
    syncContact(refcon) {
      let headers = {};
      this.controller.set('isSync', true);
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      return Ember.$.ajax(config.apiUrl + '/api/contacts/sync', {
        type: "POST",
        headers: headers,
        data: {
          id: refcon
        }

      }).then(data => {
        this.controller.set('isSync', false);
        this.get('store').pushPayload(data);
        this.get('notify').success('Contact [' + refcon + '] has been synchronized');
      }).fail(e => {
        this.controller.set('isSync', false);
        this.get('notify').error('Unable to get data! ' + e.message);
        return e;
      });
    },
    changeSave: function (step) {
      let newStepNumber = {
        step: step,
        contact: this.currentModel.get('contact.id'),
      };
      this.store.findRecord('contact', newStepNumber.contact).then((contact) => {
        contact.set('step', newStepNumber.step);
        contact.save();
        this.get('notify').success('Step has been saved to ' + newStepNumber.step);
      }, function () {
        this.get('notify').error('Saving Note Failed! MR/MS ');
      });
    },
    duplicateTask(id) {
      let headers = {};
      this.controller.set('isSync', true);
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      return Ember.$.ajax(config.apiUrl + '/api/tasks/duplicate', {
        type: "POST",
        headers: headers,
        data: {
          id: id
        }

      }).then(() => {
        this.currentModel.reload();
        this.controller.set('isSync', false);
        this.controller.set('taskrf', null);
        this.get('notify').success('Task has been created');
      }).fail(e => {
        this.controller.set('isSync', false);
        this.controller.set('taskrf', null);
        this.get('notify').error('Unable to duplicate this task! ' + e.message);
        return e;
      });
    },
    dateSave: function (dateDue) {
      this.controller.set('isSync', true);
      let newDateDue = {
        dateDue: dateDue,
        task: this.currentModel,
      };
      this.currentModel.set('dateDue', newDateDue.dateDue);
      this.currentModel.save().then(d => {
        this.controller.set('isSync', false);
        this.get('notify').success('Task successfully rescheduled');
        return d;
      }).catch(e => {
        this.currentModel.rollbackAttributes();
        this.controller.set('isSync', false);
        this.get('notify').error(e.message);
        return e;
      });
    },
    newNote: function (noteContent) {
      Ember.$('button[type="submit"]').prop('disabled', true);
      this.controller.set('btnSuccess', 'btn-danger');
      this.controller.set('noteText', 'Saving note...');
      let newNoteData = {
        content: noteContent,
        contact: this.currentModel.get('contact'),
        user: this.modelFor('application').account
      };
      if (noteContent) {
        this.store.createRecord('note', newNoteData).save().then(() => {
          this.get('notify').success('Note has been saved');
          this.controller.set('noteText', 'Save');
          Ember.$('button[type="submit"]').prop('disabled', false);
          this.controller.set('btnSuccess', 'btn-success');
          this.controller.set('noteContent', ' ');
        }, function () {
          this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
          this.controller.set('noteText', 'Save');
          Ember.$('button[type="submit"]').prop('disabled', false);
          this.controller.set('btnSuccess', 'btn-success');
        });
      } else {
        this.get('notify').error('Please Enter a note before saving!');
        Ember.$('button[type="submit"]').prop('disabled', false);
        this.controller.set('btnSuccess', 'btn-success');
        this.controller.set('noteText', 'Save');
      }
    },
    discardNote(noterf) {
      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      return Ember.$.ajax(config.apiUrl + '/api/notes/discard', {
        type: "POST",
        headers: headers,
        data: {
          id: noterf
        }
      }).then(data => {
        this.get('store').pushPayload(data);
        this.get('notify').success('Note has been discarded');
      }).fail(e => {
        this.get('notify').error('Unable to discard note! ' + e.message);
        return e;
      });
    },
    discardTaskNote(tnoterf) {
      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      return Ember.$.ajax(config.apiUrl + '/api/task-notes/discard', {
        type: "POST",
        headers: headers,
        data: {
          id: tnoterf
        }
      }).then(data => {
        this.get('store').pushPayload(data);
        this.get('notify').success('Note has been discarded');
      }).fail(e => {
        this.get('notify').error('Unable to discard note! ' + e.message);
        return e;
      });
    }
  }
});
