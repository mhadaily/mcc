import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  queryParams: {
    sort: { refreshModel: true },
    sortDir: { refreshModel: true },
    contact: { replace: true },
  },
  page: 1,
  perPage: 20,
  model(params) {
    return this.findPaged('contact', {
      paramMapping: { total_pages: "total-pages" },
      q: {
        name_or_email_or_reference_cont: Ember.$.trim(params.contact),
        step_eq_with_blank: Ember.$.trim(params.step),
        home_phone_cont: Ember.$.trim(params.home_phone),
        skype_id_cont: Ember.$.trim(params.skype_id),
        time_zone_cont: Ember.$.trim(params.time_zone),
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
