import Ember from 'ember';
import config from '../config/environment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    let headers = {};

    this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
      headers[headerName] = headerValue;
    });

    return Ember.RSVP.hash({
      tasks: this.store.findAll('task'),
      summary: Ember.$.ajax(`${config.apiUrl}/analytics/phonereps`, {
        headers: headers,
        data: params
      })
    });
  }
});
