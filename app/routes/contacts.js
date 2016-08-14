import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  queryParams:{
  		page:{
  			refreshModel: true
  		}
  },

  model(params) {
    return this.store.query('contact',params);
  }
});
