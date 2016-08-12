import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tasks');
  this.route('task',{path: 'tasks/:task_id'});
  this.route('contacts');
  this.route('contact',{path: 'contact/:reference'});
  this.route('settings');
  this.route('login');
});

export default Router;
