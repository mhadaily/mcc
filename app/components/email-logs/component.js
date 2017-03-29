import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  notify: Ember.inject.service('notify'),
  store: Ember.inject.service(),
  emailLogs: null,
  contactable_id: null,

  didInsertElement(){
    this._super(...arguments);
    let headers = {};
    this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
      headers[headerName] = headerValue;
    });
    if (this.get('contactable_id')) {
      return Ember.$.ajax(config.apiUrl + '/api/email-logs', {
        type: "GET",
        headers: headers,
        data: {
          q: {
            contactable_type_eq: 'Contact',
            contactable_id_eq: this.get('contactable_id')
          }
        }
      }).then((emails) => {
        if (emails.data.length > 0) {
          const data = emails.data;
          return this.set('emailLogs', data);
        }
        this.set('emailLogs', {});
      }).catch(e => {
        this.get('notify').error(e.message);
      });
    }
  },
  willDestroyElement(){
    this.set('emailLogs', null);
  }
});
