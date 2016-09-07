import Ember from 'ember';
import moment from 'moment';

let timer;

export default Ember.Component.extend({
  tagName: 'span',
  time: null,
  format: 'hh:mm:ssa',
  timezone: null,

  didInsertElement() {
    this._super(...arguments);

    timer = setInterval(function() {
      this.set('time', new Date());
      this.set('time', moment.tz(this.get('timezone')).format(this.get('format')));
    }.bind(this), 1000);
  },
  willDestroyElement() {
    this._super(...arguments);
    timer.destory();
  }
});
