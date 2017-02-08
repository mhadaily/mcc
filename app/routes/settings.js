import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

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
      console.warn('Will be completed Soon');
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
