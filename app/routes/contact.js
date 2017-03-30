import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),
  actions: {
    duplicateTask(id) {
      let _self = this;
      
      let headers = {};
      this.controller.set('isSync', true);
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      
      return Ember.$.ajax(config.apiUrl + '/api/tasks/duplicate', {
        type: 'POST',
        headers: headers,
        data: {
          id: id,
        },
        
      }).then(() => {
        _self.get('currentModel').reload();
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
    syncContact(refcon) {
      let headers = {};
      this.controller.set('isSync', true);
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      
      return Ember.$.ajax(config.apiUrl + '/api/contacts/sync', {
        type: 'POST',
        headers: headers,
        data: {
          id: refcon,
        },
        
      }).then(data => {
        this.controller.set('isSync', false);
        if (data) {
          this.get('store').pushPayload(data);
          this.get('notify').success('Contact [' + refcon + '] has been synchronized');
        } else {
          this.get('notify').error('Something is wrong with data.');
        }
      }).fail(e => {
        this.controller.set('isSync', false);
        this.get('notify').error('Unable to get data! ' + e.message);
        return e;
      });
    },
    changeSave(step) {
      this.controller.set('isSync', true);
      let newStepNumber = {
        step: step,
        contact: this.currentModel,
      };
      this.currentModel.set('stepNumber', newStepNumber.step);
      this.currentModel.save().then(d => {
        this.controller.set('isSync', false);
        this.get('notify').success('Step has been saved to ' + newStepNumber.step);
        return d;
      }).catch(e => {
        this.currentModel.rollbackAttributes();//revert back step
        this.controller.set('isSync', false);
        this.get('notify').error(e.message);
        return e;
      });
    },
    contactSave(contactFields) {
      this.controller.set('isSync', true);
      const [homePhone, firstName, lastName, cellPhone, officePhone, skypeId, address, address_2, city, state_code, country_code, zipCode] = contactFields;
      const setCurrentModelField = (modelField, newValue) => {
        return this.currentModel.set(modelField, newValue);
      };
      
      setCurrentModelField('homePhone', homePhone);
      setCurrentModelField('skypeId', skypeId);
      setCurrentModelField('address', address);
      setCurrentModelField('address_2', address_2);
      setCurrentModelField('city', city);
      setCurrentModelField('state_code', state_code);
      setCurrentModelField('country_code', country_code);
      setCurrentModelField('zipCode', zipCode);
      setCurrentModelField('cellPhone', cellPhone);
      setCurrentModelField('officePhone', officePhone);
      setCurrentModelField('firstName', firstName);
      setCurrentModelField('lastName', lastName);
      
      this.currentModel.save().then(d => {
        this.get('notify').success(`Contact ${firstName} ${lastName} successfully updated`);
        this.controller.set('isSync', false);
        this.currentModel.reload();
        return d;
      }).catch(e => {
        this.currentModel.rollbackAttributes(); //revert back all changes
        this.controller.set('isSync', false);
        this.get('notify').error(e.message);
        return e;
      });
    },
    newNote(noteContent) {
      Ember.$('button[type="submit"]').prop('disabled', true);
      this.controller.set('btnSuccess', 'btn-danger');
      this.controller.set('noteText', 'Saving note...');
      let newNoteData = {
        content: noteContent,
        contact: this.currentModel,
        user: this.modelFor('application').account,
      };
      this.store.createRecord('note', newNoteData).save().then(() => {
        this.get('notify').success('Note has been saved');
        Ember.$('button[type="submit"]').prop('disabled', false);
        this.controller.set('noteText', 'Save');
        this.controller.set('btnSuccess', 'btn-success');
        this.controller.set('noteContent', ' ');
      }, function() {
        this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
        this.controller.set('noteText', 'Save');
        Ember.$('button[type="submit"]').prop('disabled', false);
        this.controller.set('btnSuccess', 'btn-success');
      });
    },
    discardNote(noterf) {
      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      
      return Ember.$.ajax(config.apiUrl + '/api/notes/discard', {
        type: 'POST',
        headers: headers,
        data: {
          id: noterf,
        },
      }).then(data => {
        this.get('store').pushPayload(data);
        this.get('notify').success('Note has been discarded');
      }).fail(e => {
        this.get('notify').error('Unable to discard note! ' + e.message);
        return e;
      });
    },
    dateSave: function(dateDue, taskRef) {
      this.controller.set('isSync', true);
      let newDateDue = {
        dateDue: dateDue,
        task: this.store.peekRecord('task', taskRef),
      };
      newDateDue.task.set('dateDue', newDateDue.dateDue);
      newDateDue.task.save().then(d => {
        this.controller.set('isSync', false);
        this.get('notify').success('Task successfully rescheduled');
        return d;
      }).catch(e => {
        newDateDue.task.rollbackAttributes();
        this.controller.set('isSync', false);
        this.get('notify').error(e.message);
        return e;
      });
    },
    discardTaskNote(tnoterf) {
      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      
      return Ember.$.ajax(config.apiUrl + '/api/task-notes/discard', {
        type: 'POST',
        headers: headers,
        data: {
          id: tnoterf,
        },
      }).then(data => {
        this.get('store').pushPayload(data);
        this.get('notify').success('Note has been discarded');
      }).fail(e => {
        this.get('notify').error('Unable to discard note! ' + e.message);
        return e;
      });
    },
  },
});
