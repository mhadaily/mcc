import Ember from 'ember';
import DS from 'ember-data';
import oapStates from '../utils/oapstates';
import oapCountries from '../utils/oapcountries';

export default DS.Model.extend({
  notes: DS.hasMany(),
  salesOrders: DS.hasMany(),
  tasks: DS.hasMany(),
  taskNotes: DS.hasMany(),
  contactLogs: DS.hasMany(),
  automationLogs: DS.hasMany(),
  date: DS.attr(),
  dateLastModified: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  name: Ember.computed('firstName', 'lastName', function () {
    const firstName = this.get('firstName');
    const lastName = this.get('lastName');
    return `${firstName} ${lastName}`;
  }),
  reference: DS.attr(),
  source: DS.attr(),
  email: DS.attr(),
  homePhone: DS.attr(),
  cellPhone: DS.attr(),
  officePhone: DS.attr(),
  step: DS.attr(),
  stepNumber: DS.attr(),
  l0MttbCoach: DS.attr(),
  l1MttbCoach: DS.attr(),
  l2MttbCoach: DS.attr(),
  trafficCoach: DS.attr(),
  l1Affiliate: DS.attr(),
  l2Affiliate: DS.attr(),
  timeZone: DS.attr(),
  utcOffset: DS.attr(),
  address: DS.attr(),
  address_2: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  country: DS.attr(),
  zipCode: DS.attr(),
  skypeId: DS.attr(),
  tags: DS.attr(),
  spent: DS.attr(),
  contactedAt: DS.attr(),
  mttbApplication: DS.attr(),
  mttbInterview: DS.attr(),
  mttbStepUncontactable: DS.attr(),
  silverAgreementSigned: DS.attr(),
  mlrDate: DS.attr(),
  stateCode: Ember.computed('state', function () {
    const state = this.get('state');
    const stateCode = oapStates.filter(oapState => oapState.text === state);
    if (stateCode.length === 1) {
      return stateCode[0].value;
    }
    return state;
  }),
  countryCode: Ember.computed('country', function () {
    const country = this.get('country');
    const countryCode = oapCountries.filter(oapCountry => oapCountry.text === country);
    if (countryCode.length === 1) {
      return countryCode[0].value;
    }
    return country;
  }),
  agreementTags: Ember.computed('tags', function () {
    let tags = this.get('tags'),
      result = {};
    for (let k in tags) {
      if (tags[k].match(/agreement/i)) {
        result[k] = tags[k];
      }
    }
    return result;
  }),
  isFundingStage: Ember.computed('tags', function () {
    let tags = this.get('tags');
    // return id of "Funding Tag - Started"
    return Object.keys(tags).find(key => key === '4126');
  }),
});
