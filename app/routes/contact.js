import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	  model() {
    return {
      content: `karuna@mobe.com, you've got a new MTTB client to call:\n\n<a href=\"http://myonlinebusinessempire.com/info/index.php?lead=796593\"
  target=\"_blank\">Click Here to Access the Dashboard</a>\n\nName: Rick Lamberson\nOffice
  Phone: \nHome Phone: 9415266327\nCell Phone : 9415266327\nEmail: Dlrlamberson@gmail.com\nCountry:
  \ United States\nCity and State:  Venice, Florida\nSkype: \n\nMTTB Username:  Dlrlamberson@gmail.com\nMTTB
  Password:  2hLgum\n\n1. Get in contact with the customer with the details above\n2.
  Complete the Relevant Form in the Dashboard\n<a href=\"http://myonlinebusinessempire.com/info/index.php?lead=796593\"
  target=\"_blank\">Click Here to Access the Dashboard</a>\n3. Complete the Task with
  the correct outcome.`
    }
  }
});
