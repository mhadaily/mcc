import Ember from 'ember';


export function currentTime() {
  return new Date();
}

export default Ember.Helper.helper(currentTime);
