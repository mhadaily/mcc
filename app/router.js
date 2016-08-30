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
    this.modal('task-details', {
      withParams: ['taskrf'],
      actions: {
        dimiss: 'dimiss',
        taskChangeColor: 'taskChangeColor'
      }
    });
    this.modal('task-modal', {
      withParams: ['ref'],
      otherParams: {
        model: 'task'
      },
      actions: {
        complete: 'complete',
        cancel: 'cancel'
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
    this.modal('task-details', {
      withParams: ['taskrf'],
      actions: {
        dimiss: 'dimiss',
        taskChangeColor: 'taskChangeColor'
      }
    });
  });
  this.route('settings');
  this.route('login');
});

export default Router;
