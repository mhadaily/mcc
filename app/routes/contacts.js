import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  perPage: 20,
  model(params) {
    return this.findPaged('contact', {
      paramMapping: { total_pages: "total-pages" },
      q: {
        first_name_or_last_name_or_email_cont: params.contact,
        step_eq_with_blank: params.step,
        l1_mttb_coach_cont: params.l1_mttb_coach,
        l2_mttb_coach_cont: params.l2_mttb_coach
      }
    });
  },
  actions: {
    queryChanged() {
      this.refresh();
    }
  }
});
