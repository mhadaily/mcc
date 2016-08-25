import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service('notify'),

  actions: {
    changeSave: function(step) {
      //debugger;
      var newStepNumber = {
        step: step,
        contact: this.currentModel,
      };
      this.currentModel.set('step', newStepNumber.step);
      this.currentModel.save().then(d => {
        this.get('notify').success('Step has been saved to ' + newStepNumber.step);
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
        this.get('notify').success('Note has been saved').set('noteContent', ' ');
      }, function() {
        this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);

      });
    }
  }
});
