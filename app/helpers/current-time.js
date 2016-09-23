import Ember from 'ember';
import moment from 'moment';

export function currentTime(timezone) {
  let time = moment.tz(timezone[0]).format('hh:mm a');
  return time;
}

export default Ember.Helper.helper(currentTime);
