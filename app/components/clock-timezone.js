import Ember from 'ember';
import moment from 'moment';

let timer;

export default Ember.Component.extend({
  tagName: 'span',
  time: null,
  format: 'hh:mm a',
  timezone: null,
  interval: 60000,
  init() {
    this._super(...arguments);
    this.set('time', moment.tz(this.get('timezone')).format(this.get('format')));
  },
  didInsertElement() {
    this._super(...arguments);

    timer = setInterval(function() {
      this.set('time', new Date());
      this.set('time', moment.tz(this.get('timezone')).format(this.get('format')));
    }.bind(this), this.get('interval'));
  },
  willDestroyElement() {
    this._super(...arguments);
    /* TO DO - We need to destory timer while exiting */
    //timer().destory();
  }
});
