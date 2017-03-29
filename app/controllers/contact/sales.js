import Ember from 'ember';
const { Controller, computed } = Ember;

export default Controller.extend({
  salesOrders: computed('model.salesOrders.[]', 'model.salesOrders.@each.date', function() {
    return this.get('model.salesOrders').sortBy('date').reverse();
  }),
});
