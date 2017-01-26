import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  notify: Ember.inject.service('notify'),
  session: Ember.inject.service('session'),
  store: Ember.inject.service(),
  actions: {
    processing(processing, disabled){
      Ember.$('#fundingButton').text(processing).attr('disabled', disabled);
    },
    addTag(reference){
      this.actions.processing('Processing...', 'disabled');
      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });
      const data = {
        id: reference,
        oap_funding_tag_id: 4126
      };
      return Ember.$.ajax(config.apiUrl + '/api/contacts/add_tag', {
          type: "POST",
          headers: headers,
          data: data
        })
        .then(res => {
          this.get('store').pushPayload(res);
          this.get('notify').success('You request was successfully added to the contact');
        })
        .catch(e => this.get('notify').error('Unable to get data! at this time. ' + e.statusText))
        .done(() => {
          this.dismiss();
          this.actions.processing('Yes Submit', null);
        });
    },
  },
})
;
