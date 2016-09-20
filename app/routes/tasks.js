import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {

  queryParams: {
    sort: { refreshModel: true },
    sortDir: { refreshModel: true },
    date_due_gteq: { replace: true },
    date_due_lteq: { replace: true }
  },

  page: 1,
  perPage: 20,
  model(params) {
    let user_name = this.modelFor('application').account.get('name');
    return this.findPaged('task', {
      paramMapping: { total_pages: "total-pages" },
      q: {
        contact_name_cont: params.contact,
        contact_step_eq: params.contact_step,
        contact_time_zone_cont: params.contact_time_zone,
        subject_cont: params.subject,
        date_due_gteq: params.date_due_gteq,
        date_due_lteq: params.date_due_lteq,
        status_eq: (params.status_eq === 'all status' ? '' : params.status_eq),
        user_name_eq: (params.user_name === 'all calls' ? '' : user_name),
        s: `${params.sort} ${params.sortDir}`
      }
    });
  },
  actions: {
    queryChanged() {
      this.refresh();
    }
  }
});
