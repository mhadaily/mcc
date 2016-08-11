export default function(){
  this.transition(
    this.fromRoute('index'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
  this.transition(
    this.fromRoute('contacts'),
    this.toRoute('tasks'),
    this.use('toUp'),
    this.reverse('toDown')
  );
  this.transition(
    this.toRoute('contact'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
  this.transition(
    this.toRoute('task'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
};
