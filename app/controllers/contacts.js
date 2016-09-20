import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact", "step", "home_phone", "skype_id", "time_zone", "country_or_state", "query", "page", "perPage", "sort", "sortDir"],
  contact: '',
  contactTrim: Ember.computed('contact', {
    get( /* key */ ) {
      return this.get('contact') ? Ember.$.trim(this.get('contact')) : null;
    },
    set(key, value) {
      this.set('contact', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  step: '',
  stepTrim: Ember.computed('step', {
    get( /* key */ ) {
      return this.get('step') ? Ember.$.trim(this.get('step')) : null;
    },
    set(key, value) {
      this.set('step', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  home_phone: '',
  home_phoneTrim: Ember.computed('home_phone', {
    get( /* key */ ) {
      return this.get('home_phone') ? Ember.$.trim(this.get('home_phone')) : null;
    },
    set(key, value) {
      this.set('home_phone', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  skype_id: '',
  skype_idTrim: Ember.computed('skype_id', {
    get( /* key */ ) {
      return this.get('skype_id') ? Ember.$.trim(this.get('skype_id')) : null;
    },
    set(key, value) {
      this.set('skype_id', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  time_zone: '',
  time_zoneTrim: Ember.computed('time_zone', {
    get( /* key */ ) {
      return this.get('time_zone') ? Ember.$.trim(this.get('time_zone')) : null;
    },
    set(key, value) {
      this.set('time_zone', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  country_or_state: '',
  country_or_stateTrim: Ember.computed('country_or_state', {
    get( /* key */ ) {
      return this.get('country_or_state') ? Ember.$.trim(this.get('country_or_state')) : null;
    },
    set(key, value) {
      this.set('country_or_state', value ? Ember.$.trim(value) : '');
      return value;
    }
  }),
  query: '',
  page: 1,
  sortBy: ['name:asc'],
  contacts: Ember.computed.sort('model', 'sortBy')
});
