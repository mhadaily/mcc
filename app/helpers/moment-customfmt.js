import Ember from 'ember';
import moment from 'moment';

export function momentCustomfmt(dateParam) {
  let date = new Date(dateParam);
  let momentDate = moment(date).format('MM/DD/YYYY hh:mm a');
  return momentDate;
}

export default Ember.Helper.helper(momentCustomfmt);
