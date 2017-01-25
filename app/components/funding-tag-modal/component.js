import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),
  actions: {
    addTag(reference) {
      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      return Ember.$.ajax(config.apiUrl + '/api/contacts/add_tag', {
        type: "POST",
        headers: headers,
        data: {
          id: reference,
          oap_funding_tag_id: 4126
        }
      }).then(data => {
        console.log('data',data);
          this.get('store').pushPayload(data);
          this.get('notify').success('You request was successfully added to the contact');
      }).catch(e => {
        this.get('notify').error('Unable to get data! at this time. ' + e.statusText);
        return e;
      });
    }
  },
});
