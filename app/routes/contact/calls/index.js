import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../../../config/environment';
const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  notify: inject.service('notify'),
  model() {
    return this.modelFor('contact');
  },
  setupController(controller){
    this._super(...arguments);
    controller.set('currentUser', this.modelFor('application').account.id);
  },
  actions: {
    duplicateTask(id) {
      let _self = this;
      
      let headers = {};
      this.controller.set('isSync', true);
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      
      return Ember.$.ajax(config.apiUrl + '/api/tasks/duplicate', {
        type: 'POST',
        headers: headers,
        data: {
          id: id,
        },
        
      }).then(() => {
        _self.get('currentModel').reload();
        this.controller.set('isSync', false);
        this.controller.set('taskrf', null);
        this.get('notify').success('Task has been created');
      }).fail(e => {
        this.controller.set('isSync', false);
        this.controller.set('taskrf', null);
        this.get('notify').error('Unable to duplicate this task! ' + e.message);
        return e;
      });
    },
  },
});
