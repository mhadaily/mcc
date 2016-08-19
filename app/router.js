import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('tasks');
  this.route('task', { path: 'tasks/:task_id' }, function() {
    this.modal('step-modal', {
      withParams: ['step'],
      actions: {
        changeSave: 'changeSave'
      }
    });
    this.modal('task-modal', {
      withParams: ['taskStatus'],
      actions: {
        complete: 'complete'
      }
    });
  });
  this.route('contacts');
  this.route('contact', { path: 'contacts/:contact_id' }, function() {
    this.modal('step-modal', {
      withParams: ['step'],
      actions: {
        changeSave: 'changeSave'
      }
    });
  });

  this.route('settings');
  this.route('login');
});

export default Router;
