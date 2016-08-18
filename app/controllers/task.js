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
    newNote: function() {

      var model = this.get('model');
      var newNoteData = {

        content: this.get('noteContent'),
        contact: model.get('contact')

      };

      model.store.createRecord('note', newNoteData).save().then(() => {

        alert('Note has been saved');
        this.set('noteContent', ' ');

      }, function() {

        alert('Saving Note Failed!');

      });

    }
  }
});
