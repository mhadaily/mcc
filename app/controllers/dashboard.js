import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller(),
  queryParams: ['announce'],
  announce: null
});
