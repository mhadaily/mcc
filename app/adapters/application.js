import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  authorizer: 'authorizer:oauth2-bearer',
  host: config.apiUrl,
  namespace: 'api'
});
