import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  queryParams: {
    sort: {refreshModel: true},
    sortDir: {refreshModel: true}
  },
  model(params) {
    return this.findPaged('task', {
      paramMapping: { total_pages: "total-pages" },
      q: {
        contact_first_name_or_contact_last_name_cont: params.contact,
        subject_cont: params.subject,
        date_due_gteq: params.date_due_gteq,
        date_due_lteq: params.date_due_lteq,
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
