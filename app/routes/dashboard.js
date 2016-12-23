import Ember from 'ember';
import config from '../config/environment';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import moment from 'moment';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  queryParams: {
    sort: { refreshModel: true },
    sortDir: { refreshModel: true },
  },

  perPage: 15,
  model(params) {
    let headers = {};
    let user_name = this.modelFor('application').account.get('name');

    this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
      headers[headerName] = headerValue;
    });

    let today = moment().startOf('day').toDate();
    let tomorrow = moment().startOf('day').add(1, 'day').toDate();
    params.paramMapping = { total_pages: 'total-pages' };

    return Ember.RSVP.hash({
      todayTasks: this.findPaged('task', Ember.merge(params, { q: { user_name_eq: user_name ,status_eq: 'pending', date_due_gteq: today, date_due_lt: tomorrow, s: `${params.sort} ${params.sortDir}` } })),
      futureTasks: this.findPaged('task', Ember.merge(params, { q: { user_name_eq: user_name ,status_eq: 'pending', date_due_gteq: tomorrow, s: `${params.sort} ${params.sortDir}` } })),
      overdueTasks: this.findPaged('task', Ember.merge(params, { q: { user_name_eq: user_name ,status_eq: 'pending', date_due_lt: today, s: `${params.sort} ${params.sortDir}` } })),
      completedTasks: this.findPaged('task', Ember.merge(params, { q: { user_name_eq: user_name ,status_eq: 'completed', s: `${params.sort} ${params.sortDir}` } })),
      cancelledTasks: this.findPaged('task', Ember.merge(params, { q: { user_name_eq: user_name ,status_eq: 'cancelled', s: `${params.sort} ${params.sortDir}` } })),
      summary: Ember.$.ajax(`${config.apiUrl}/analytics/phonereps`, {
        headers: headers,
        data: params
      }),
      leaderboard: Ember.$.ajax(`${config.apiUrl}/analytics/leaderboard`, {
        headers: headers,
        data: params
      }),
    });
  }
});
