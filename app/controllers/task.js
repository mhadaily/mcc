import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step', 'taskStatus'],
  step: null,
  taskStatus: null,
  backTo: null,

});
