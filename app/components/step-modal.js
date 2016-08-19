import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['step-modal'],
  actions: {
    dismiss: function() {
      this.sendAction('dismiss');
    },
    change: function(step) {
      this.sendAction('changeSave', step);
    },
    stepDown: function() {
      var stepNoDown = this.get('step');
      if (isNaN(stepNoDown) || stepNoDown === 0) {
        alert('There is no value');
      } else {
        stepNoDown = parseInt(stepNoDown) - 1;
        this.set('step', stepNoDown);
      }
    },
    stepUp: function() {
      var stepNoUp = this.get('step');
      if (isNaN(stepNoUp)) {
        alert('There is no value');
      } else {
        stepNoUp = parseInt(stepNoUp) + 1;
        this.set('step', stepNoUp);
      }
    }
  }
});
