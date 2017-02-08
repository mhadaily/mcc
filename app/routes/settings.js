import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  model: function() {
    return this.modelFor('application').account;
  },
  activate(){
    const country = this.modelFor('application').account.get('country');
    const timeZone = this.modelFor('application').account.get('timeZone');

    Ember.$('#country_user > option').map(function(index,option) {
      if (option.value === country || option.text === country) {
        Ember.$(this).prop('selected', true);
      }
    });
    Ember.$('#time_zone_user > option').map(function(index,option) {
      if (option.value === timeZone || option.text === timeZone) {
        Ember.$(this).prop('selected', true);
      }
    });
  },
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
