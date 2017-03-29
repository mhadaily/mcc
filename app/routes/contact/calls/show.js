import Ember from 'ember';
const { Route } = Ember;

export default Route.extend({
  model(params){
    return this.store.find('task', params.call_id);
  },
});
