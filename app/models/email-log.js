import DS from 'ember-data';

export default DS.Model.extend({
  contact:   DS.belongsTo('contact.contactable', { polymorphic: true }),
  subjectable_id: DS.attr(),
  subjectable_type: DS.attr(),
  contactable_id: DS.attr(),
  contactable_type: DS.attr(),
  subject: DS.attr(),
  body: DS.attr(),
  subjectable_name: DS.attr(),
  contactable_name: DS.attr(),
  status: DS.attr(),
  email_id: DS.attr(),
  email_address: DS.attr(),
  reference: DS.attr(),
});
