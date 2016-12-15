import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dashboard');
  this.route('tasks');
  this.route('task', { path: 'tasks/:task_id' });
  this.route('contacts');
  this.route('contact', { path: 'contacts/:contact_id' });
  this.route('settings');
  this.route('login');
  this.route('informations');
  this.route('lookup');
  this.route('training');
  this.route('buyerlead');
  this.route('l2resources');
});

export default Router;
