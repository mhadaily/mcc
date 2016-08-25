import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),

  actions: {
    changeSave: function(step) {
      //debugger;
      var newStepNumber = {
        step: step,
        contact: this.currentModel.get('contact.id'),
      };
      this.store.findRecord('contact', newStepNumber.contact).then((contact) => {
        contact.set('step', newStepNumber.step);
        contact.save();
        this.get('notify').success('Step has been saved to ' + newStepNumber.step);
      }, function() {
        this.get('notify').error('Saving Note Failed! MR/MS ');
      });
    },
    newNote: function(noteContent) {
      //debugger;
      var newNoteData = {
        content: noteContent,
        contact: this.currentModel.get('contact'),
        user: this.modelFor('application').account
      };
      this.store.createRecord('note', newNoteData).save().then(() => {
        this.get('notify').success('Note has been saved');
        this.set('noteContent', ' ');
      }, function() {
        this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
      });
    }
  }


});
