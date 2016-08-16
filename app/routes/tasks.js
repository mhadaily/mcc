import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    },
    date_due_from: {
      refreshModel: true
    },
    date_due_to: {
      refreshModel: true
    }
  },
  query: null,
  model(params) {
    return this.store.query('task', {
      q: {
        contact_first_name_or_contact_last_name_cont: params.contact,
        subject_cont: params.subject,
        step_num_eq: params.step,
        date_due_gteq: params.date_due_from,
        date_due_lteq: params.date_due_to
      }
    });
  },
  actions: {
    queryChanged() {
      this.refresh();
    }
  }
});
