import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.modal('library-modal', {
    withParams: ['library'],
    actions: {
      dimiss: 'dimiss',
    }
  });
  this.modal('search-modal', {
    withParams: ['search'],
    actions: {
      dimiss: 'dimiss',
      queryChanged: 'queryChanged'
    }
  });
  this.route('dashboard');
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
      }
    });
    this.modal('task-cancel', {
      withParams: ['refID'],
      otherParams: {
        model: 'task'
      },
      actions: {
        cancel: 'cancel'
      }
    });
    this.modal('task-reschedule', {
      withParams: ['taskrf'],
      actions: {
        cancel: 'cancel',
        dateSave: 'dateSave'
      }
    });
  });

  this.route('contacts',function(){
    this.modal('contact-lookup', {
      withParams: ['lookup'],
      actions: {
        dimiss: 'dimiss',
        lookUp: 'lookUp'
      }
    });
  });
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
    this.modal('contact-modal', {
      withParams: ['contactrf'],
      actions: {
        cancel: 'cancel',
        contactSave: 'contactSave'
      }
    });
    this.modal('sync-modal', {
      withParams: ['refcon'],
      actions: {
        cancel: 'cancel',
        syncContact: 'syncContact'
      }
    });
  });
  this.route('settings');
  this.route('login');
  this.route('informations');
  this.route('lookup');
  this.route('training');
  this.route('buyerlead');
  this.route('l2resources');
});

export default Router;
