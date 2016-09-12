import Ember from 'ember';
import config from '../config/environment';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  perPage: 15,
  model(params) {
    let headers = {};

    this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
      headers[headerName] = headerValue;
    });

    var today = moment().startOf('day').toDate();
    var tomorrow = moment().startOf('day').add(1, 'day').toDate();
    params.paramMapping = { total_pages: 'total-pages' };

    return Ember.RSVP.hash({
      todayTasks: this.findPaged('task', Ember.merge(params, { q: { status_eq: 'pending', date_due_gteq: today, date_due_lt: tomorrow } })),
      futureTasks: this.findPaged('task', Ember.merge(params, { q: { status_eq: 'pending', date_due_gteq: tomorrow } })),
      overdueTasks: this.findPaged('task', Ember.merge(params, { q: { status_eq: 'pending', date_due_lt: today } })),
      completedTasks: this.findPaged('task', Ember.merge(params, { q: { status_eq: 'completed' } })),
      cancelledTasks: this.findPaged('task', Ember.merge(params, { q: { status_eq: 'cancelled' } })),
      summary: Ember.$.ajax(`${config.apiUrl}/analytics/phonereps`, {
        headers: headers,
        data: params
      })
    });
  }
});
