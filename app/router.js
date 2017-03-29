import Ember from 'ember';
import config from './config/environment';
const { Router, inject, run } = Ember;

export default Router.extend({
  location: config.locationType,
  metrics: inject.service(),
  rootURL: config.rootURL,
  
  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },
  
  _trackPage() {
    run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      
      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  },
});

Router.map(function() {
  this.route('dashboard');
  this.route('tasks');
  this.route('task', { path: 'tasks/:task_id' });
  this.route('contacts');
  this.route('contact', { path: 'contacts/:contact_id' }, function() {
    this.route('summary');
    this.route('details');
    this.route('sales');
    this.route('calls');
    this.route('tags');
    this.route('logs');
    this.route('interview');
  });
  this.route('settings');
  this.route('login');
  this.route('informations');
  this.route('lookup');
  this.route('training');
  this.route('buyerlead');
  this.route('l2resources');
  this.route('calendar');
});
