import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  model() {
    return this.modelFor('contact');
  },
  setupController(controller){
    this._super(...arguments);
    controller.set('currentUser', this.modelFor('application').account.id);
  },
});
