import Ember from 'ember';
import config from '../config/environment';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  beforeModel() {
    this._super(...arguments);
    this.transitionTo('dashboard');
  }
});
