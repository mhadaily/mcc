import Ember from 'ember';

export default Ember.Controller.extend({

    actions: {

        newNote: function() {

            //var model = this.get('model');
            var newNoteData = {

                content: this.get('noteContent'),
                contact: this.model

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
