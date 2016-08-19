import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['backTo', 'step'],
  step: null,
  backTo: null,

});
