import Ember from 'ember';

export default Ember.Component.extend({
  modalAnimation(){
    return this.lookup('explode').call(this, {
      pick: '.mobe-modal-background',
      use: ['fade', { maxOpacity: 0.75 }]
    }, {
      pick: '.mobe-modal-dialog',
      use: 'to-down'
    });
  }
});
