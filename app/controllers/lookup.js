import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["contact_name","contact_email","reference", "home_phone", "cell_phone", "skype_id", "query","page", "perPage", "sort", "sortDir"],
  contact_name: '',
  contact_email: '',
  reference:'',
  home_phone: '',
  cell_phone: '',
  skype_id: '',
  query: '',
  page: 1,
  sortBy: ['name:asc'],
  actions: {
    queryClear() {
      this.set('contact_name', '');
      this.set('contact_email', '');
      this.set('reference', '');
      this.set('home_phone', '');
      this.set('cell_phone', '');
      this.set('skype_id', '');
      this.send("returnNothing");
    }
  }
});
