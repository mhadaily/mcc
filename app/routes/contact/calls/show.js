import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  model(params){
    return this.store.find('task', params.call_id);
  },
  setupController(controller){
    this._super(...arguments);
    controller.set('currentUser', this.modelFor('application').account.id);
  },
});
