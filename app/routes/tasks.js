import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {

  queryParams: {
    sort: { refreshModel: true },
    sortDir: { refreshModel: true },
    date_due_gteq: { replace: true },
    date_due_lteq: { replace: true },
    offset_from: { replace: true },
    offset_to: { replace: true }
  },

  page: 1,
  perPage: 20,
  model(params) {
    let user_id = this.modelFor('application').account.get('id');
    return this.findPaged('task', {
      paramMapping: { total_pages: "total-pages" },
      q: {
        contact_name_or_contact_email_or_contact_reference_cont: Ember.$.trim(params.contact),
        contact_step_eq: Ember.$.trim(params.contact_step) === '0' ? '_blank' : Ember.$.trim(params.contact_step),
        contact_time_zone_cont: Ember.$.trim(params.contact_time_zone),
        subject_cont: Ember.$.trim(params.subject),
        date_due_gteq: Ember.$.trim(params.date_due_gteq),
        date_due_lteq: Ember.$.trim(params.date_due_lteq),
        contact_utc_offset_gteq: Ember.$.trim(params.offset_from),
        contact_utc_offset_lt: Ember.$.trim(params.offset_to),
        status_eq: (params.status_eq === 'all status' ? '' : params.status_eq),
        user_id_eq: (params.user_name === 'all calls' ? '' : user_id),
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
