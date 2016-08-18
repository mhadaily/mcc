import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step'],
  step: null,

  backTo: null,

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

      var newNoteComplete = {

        complete: 1,
        contact: this.model.get('contact')

      };

      this.store.createRecord('task', newNoteComplete).save().then(() => {

        alert('Note has been saved');

      }, function() {

        alert('Saving Note Failed!');

      });


    },
    newNote: function() {


      var newNoteData = {

        content: this.get('noteContent'),
        contact: this.model.get('contact')

      };

      this.store.createRecord('note', newNoteData).save().then(() => {

        alert('Note has been saved');
        this.set('noteContent', ' ');

      }, function() {

        alert('Saving Note Failed!');

      });

    }
  }
});
