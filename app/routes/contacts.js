import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  queryParams: {
    sort: { refreshModel: true },
    sortDir: { refreshModel: true },
    contact: { replace: true },
    date_gteq: {replace: true},
    date_lteq: {replace: true},
  },
  page: 1,
  perPage: 20,
  model(params) {
    return this.findPaged('contact', {
      paramMapping: { total_pages: "total-pages" },
      q: {
        name_or_email_or_reference_cont: Ember.$.trim(params.contact),
        step_number_eq: Ember.$.trim(params.step_number),
        home_phone_cont: Ember.$.trim(params.home_phone),
        cell_phone_cont: Ember.$.trim(params.cell_phone),
        skype_id_cont: Ember.$.trim(params.skype_id),
        time_zone_cont: Ember.$.trim(params.time_zone),
        utc_offset_gteq: Ember.$.trim(params.offset_from),
        utc_offset_lt: Ember.$.trim(params.offset_to),
        date_gteq: Ember.$.trim(params.date_gteq),
        date_lteq: Ember.$.trim(params.date_lteq),
        country_or_state_cont: Ember.$.trim(params.country_or_state),
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
