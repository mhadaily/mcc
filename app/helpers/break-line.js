import Ember from 'ember';

export function breakLine(param) {

  var text = Ember.String.htmlSafe(param);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return Ember.SafeString(text);

}

export default Ember.Helper.helper(breakLine);
