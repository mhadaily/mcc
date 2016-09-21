import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNames: 'bs-popover-component btn btn-primary',
  placement: 'top',
  title: '',
  didInsertElement: function() {
    let component = this;
    let contents = this.$('.popoverJs');
    component.$().popover({
      animation: false,
      placement: component.get('placement'),
      html: true,
      content: contents
    }).on('show.bs.popover', function() {
      contents.removeClass('hide');
    });
  },
  willDestroyElement: function() {
    this.$().popover('destroy');
  },
  actions: {
    searchNow() {
      var trimMe = function(str) {
        return Ember.$.trim(str);
      }
      let contact = trimMe(this.get('contact'));
      let step = trimMe(this.get('step'));
      let country_or_state = trimMe(this.get('country_or_state'));
      let home_phone = trimMe(this.get('home_phone'));
      let cell_phone = trimMe(this.get('cell_phone'));
      let skype_id = trimMe(this.get('skype_id'));
      let time_zone = trimMe(this.get('time_zone'));

      this.sendAction('queryChanged', contact, step, country_or_state, home_phone, cell_phone, skype_id, time_zone);
      debugger;
    }
  }
});
