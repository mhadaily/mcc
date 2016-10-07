import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  isSearch: false,
  queryParams: {
    sort: { refreshModel: true },
    sortDir: { refreshModel: true },
    contact_name: {replace: true},
    reference: {replace: true},
    contact_email: {replace: true}
  },
  page: 1,
  perPage: 20,
  lookup: null,
  model(params) {
    let isSearch = this.get('isSearch');
    if (isSearch) {
      return this.findPaged('contact', {
        q: {
          reference: Ember.$.trim(params.reference),
          contact_name: Ember.$.trim(params.contact_name),
          contact_email: Ember.$.trim(params.contact_email),
          home_phone: Ember.$.trim(params.home_phone),
          cell_phone: Ember.$.trim(params.cell_phone),
          skype_id: Ember.$.trim(params.skype_id),
          lookup: this.get('lookup')
        }
      });
    }
  },
  actions: {
    queryChanged() {
      this.set('isSearch',true);
      this.set('lookup',true);
      this.refresh();
    },
    returnNothing(){
      this.set('lookup',null);
      this.set('isSearch',false);
      this.refresh();
    }
  }
});
