import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),
  actions: {
    syncContact: function (refcon) {
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
    changeSave: function (step) {
      //debugger;
      var newStepNumber = {
        step: step,
        contact: this.currentModel,
      };
      this.currentModel.set('step', newStepNumber.step);
      this.currentModel.save().then(d => {
        this.get('notify').success('Step has been saved to ' + newStepNumber.step);
        return d;
      }).catch(e => {
        this.get('notify').error(e.message);
        return e;
      });
    },
    contactSave: function (homePhone, skypeId) {

      var newPhoneNumber = {
        homePhone: homePhone,
        contact: this.currentModel,
      };
      var newSkypeId = {
        skypeId: skypeId,
        contact: this.currentModel,
      };
      this.currentModel.set('homePhone', newPhoneNumber.homePhone);
      this.currentModel.set('skypeId', newSkypeId.skypeId);
      this.currentModel.save().then(d => {
        this.get('notify').success('Contact successfully updated');
        return d;
      }).catch(e => {
        this.get('notify').error(e.message);
        return e;
      });
    },
    newNote: function (noteContent) {
      var newNoteData = {
        content: noteContent,
        contact: this.currentModel,
        user: this.modelFor('application').account
      };
      this.store.createRecord('note', newNoteData).save().then(() => {
        this.get('notify').success('Note has been saved');
        this.controller.set('noteContent', ' ');

      }, function () {
        this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);

      });
    }
  }
});
