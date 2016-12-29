import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),
  actions: {
    duplicateTask(id) {
      // this.controller.set('isSync', true);
      // let newTaskData = {
      //   id: id,
      // };
      // this.store.createRecord('task', newTaskData).save().then(() => {
      //   this.controller.set('isSync', false);
      //   this.get('notify').success('New Task has been saved');
      // }, (e) => {
      //   this.controller.set('isSync', false);
      //   this.get('notify').error('Failed! ' + e.message);
      // });
      let _self = this;

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
        type: "POST",
        headers: headers,
        data: {
          id: refcon
        }

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
      this.currentModel.set('step', newStepNumber.step);
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
    contactSave(...contactParams) {
      this.controller.set('isSync', true);
      console.log(contactParams);
      const [homePhone, skypeId, address, address_2, city, state, country, zipCode, cellPhone, officePhone] = contactParams;
      const newInfo = {
        homePhone,
        skypeId,
        address,
        address_2,
        city,
        state,
        country,
        zipCode,
        cellPhone,
        officePhone,
        contact: this.currentModel,
      };
      this.currentModel.set('homePhone', newInfo.homePhone);
      this.currentModel.set('skypeId', newInfo.skypeId);
      this.currentModel.set('address', newInfo.address);
      this.currentModel.set('address_2', newInfo.address_2);
      this.currentModel.set('city', newInfo.city);
      this.currentModel.set('state', newInfo.state);
      this.currentModel.set('country', newInfo.country);
      this.currentModel.set('zipCode', newInfo.zipCode);
      this.currentModel.set('cellPhone', newInfo.cellPhone);
      this.currentModel.set('officePhone', newInfo.officePhone);

      this.currentModel.save().then(d => {
        this.controller.set('isSync', false);
        this.get('notify').success('Contact successfully updated');
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
        user: this.modelFor('application').account
      };
      this.store.createRecord('note', newNoteData).save().then(() => {
        this.get('notify').success('Note has been saved');
        Ember.$('button[type="submit"]').prop('disabled', false);
        this.controller.set('noteText', 'Save');
        this.controller.set('btnSuccess', 'btn-success');
        this.controller.set('noteContent', ' ');
      }, function () {
        this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
        this.controller.set('noteText', 'Save');
        Ember.$('button[type="submit"]').prop('disabled', false);
        this.controller.set('btnSuccess', 'btn-success');
      });
    }
  }
});
