import Ember from 'ember';

export function breakLine(param) {

  var text = Ember.String.htmlSafe(param);
  text = text.toString().replace(/(\r\n|\n|\r)/gm, '<br>');
  return Ember.String.htmlSafe(text);

}

export default Ember.Helper.helper(breakLine);
