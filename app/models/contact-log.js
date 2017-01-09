import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  contact: DS.belongsTo(),
  reference: DS.attr(),
  topic: DS.attr(),
  contactLogType: DS.attr(),
  date: DS.attr(),
  translated: Ember.computed('contactLogType', function () {
    let type = this.get('contactLogType');
    switch (type) {
      case '0':
        type = "Email";
        break;
      case '1':
        type = "Task";
        break;
      default:
        return type;
    }
    return type;
  })
});
