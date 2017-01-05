import Ember from 'ember';

export default Ember.Component.extend({
  noteContentModal: Ember.computed(function () {
    return Cookies.get("_mcc_complete_tmp");
  }),
  actions: {
    updateTmpContent(noteContentModal){
      const tmpCookie = Cookies.get("_mcc_complete_tmp");
      if (tmpCookie) {
        Cookies.remove("_mcc_complete_tmp");
      }
      Cookies.set("_mcc_complete_tmp", noteContentModal, {expires: 7});
    },
  },
});
