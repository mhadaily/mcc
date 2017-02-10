import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import config from '../config/environment';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),
  notify: Ember.inject.service('notify'),
  model: function () {
    return this.modelFor('application').account;
  },
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    savePassword(){

      let id = this.currentModel.id;
      let password = this.controller.passwordFields.password;
      let password_confirmation = this.controller.passwordFields.passwordConfirmation;

      if (password !== password_confirmation) {
        this.get('notify').error('Passwords are not equal or empty');
        return;
      }

      let headers = {};
      this.get('session').authorize('authorizer:oauth2-bearer', (headerName, headerValue) => {
        headers[headerName] = headerValue;
      });

      return Ember.$.ajax(config.apiUrl + `/api/users/${id}/password`, {
        type: "POST",
        headers: headers,
        data: {
          password,
          password_confirmation
        }
      }).then(data => {
        this.get('notify').success('Password has been changed');
        this.get('session').invalidate();
      }).fail(e => {
        return this.get('notify').error('Unable to change password! ' + e.message);
      });

    },
    saveProfile(){
      this.currentModel.save()
        .then((d) => {
          this.get('notify').success('Contact successfully updated');
          return d;
        })
        .catch((e) => {
          this.get('notify').error(e.message);
        });
    }
  }
});
