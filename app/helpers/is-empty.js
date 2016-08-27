import Ember from 'ember';

export function isEmpty(params/*, hash*/) {
  return Ember.isEmpty(params);
}

export default Ember.Helper.helper(isEmpty);
