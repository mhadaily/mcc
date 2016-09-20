import Ember from 'ember';

export function trimValue(params /*, hash*/ ) {
  return Ember.$.trim(params);
}

export default Ember.Helper.helper(trimValue);
