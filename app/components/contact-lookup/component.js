import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'contact-lookup',
  queryParams: ['lookup'],
  store: Ember.inject.service(),

  /*  TODO
      This component is supposed to use for no-policy  contact search
   */
  actions:{
    dismiss(){
      this.sendAction('dismiss');
    }
  }
});
