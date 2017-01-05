import Ember from 'ember';

export default Ember.Component.extend({
  noteContentModal: Ember.computed(function () {
    return Cookies.get("_mcc_cancel_tmp");
  }),
  actions: {
    updateTmpContent(noteContentModal){
      const tmpCookie = Cookies.get("_mcc_cancel_tmp");
      if (tmpCookie) {
        Cookies.remove("_mcc_cancel_tmp");
      }
      Cookies.set("_mcc_cancel_tmp", noteContentModal, {expires: 7});
    },
  },
});
