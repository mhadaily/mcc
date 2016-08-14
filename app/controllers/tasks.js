import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams:[
		'page',
	],
	page: 1,

	actions:{
		nextPage(){
			let page = this.get('page');
			this.set('page',page + 1);
		},
		prevPage(){
			let page = this.get('page');
			this.set('page',page - 1);
		}
	}
});
