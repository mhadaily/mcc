import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {

    changeSave: function() {
      var newStepNumber = {
        step: this.get('step'),
        contact: this.model
      };

      this.store.createRecord('contact', newStepNumber).save().then(() => {
        alert('Step has been saved');
        this.set('step', newStepNumber.step);
      }, function() {
        alert('Failed to save! Please try later!');
      });
    },

    taskComplete: function() {
      this.model.set('statusEvent', 'complete');
      this.model.save().then(d => {
        alert('task complated');
        return d;
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
        alert('Note has been saved');
        this.set('noteContent', ' ');

      }, function() {
        alert(newNoteData.author);
        alert('Saving Note Failed!');

      });
    }
  }


});
