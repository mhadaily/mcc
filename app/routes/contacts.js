import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {

  model(params) {
    return this.findPaged('contact', {
      paramMapping: {total_pages: "total-pages"},
      q: {
        first_name_or_last_name_or_email_cont: params.contact,
        step_eq_with_blank: params.step
      }
    });
  },
  actions: {
    queryChanged() {
      this.refresh();
    }
  }
});
