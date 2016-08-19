import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  actions: {
    changeSave: function(step) {
      //debugger;
      var newStepNumber = {
        step: step,
        contact: this.currentModel,
      };
      this.currentModel.set('step', newStepNumber.step);
      this.currentModel.save().then(d => {
        alert('Step has been saved to' + newStepNumber.step);
        return d;
      });
    },
    newNote: function(noteContent) {
      var newNoteData = {
        content: noteContent,
        contact: this.currentModel,
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
