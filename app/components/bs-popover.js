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

});
