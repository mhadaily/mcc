import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';


export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  isSearch: false,
  queryParams: {
    sort: {refreshModel: true},
    sortDir: {refreshModel: true},
    contact_name: {replace: true},
    reference: {replace: true},
    contact_email: {replace: true}
  },
  page: 1,
  perPage: 20,
  lookup: null,
  model(params) {
    if (this.get('isSearch')) {
      let headers = {};

      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      return Ember.RSVP.hash({
        lookupLists: Ember.$.ajax(config.apiUrl + '/api/contacts/lookup', {
          headers: headers,
          data: {
            reference: Ember.$.trim(params.reference),
            contact_name: Ember.$.trim(params.contact_name),
            contact_email: Ember.$.trim(params.contact_email)
          }
        })
      })
    }
  },
  actions: {
    queryChanged() {
      this.set('isSearch', true);
      this.set('lookup', true);
      this.refresh();
    },
    returnNothing(){
      this.set('lookup', null);
      this.set('isSearch', false);
      this.refresh();
    }
  }
});
