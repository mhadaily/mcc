import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  actions: {
    newNote(noteContent) {
      let newNoteData = {
        content: noteContent,
        contact: this.currentModel.get('contact'),
        user: this.modelFor('application').account
      };
      if (noteContent) {
        this.store.createRecord('note', newNoteData).save().then(() => {
          this.get('notify').success('Note has been saved').this.set('noteContent', ' ');
        }, function() {
          this.get('notify').error('Saving Note Failed! MR/MS ' + newNoteData.author);
        });
      }
    }
  }
});
