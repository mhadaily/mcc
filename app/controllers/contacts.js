import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: [
        'page',
        'search',
    ],
    page: 1,
    search: "",
    actions: {
        nextPage() {
            let page = this.get('page');
            this.set('page', page + 1);
        },
        prevPage() {
            let page = this.get('page');
            this.set('page', page - 1);
        }
    }
});
