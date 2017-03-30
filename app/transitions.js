export default function() {
  this.transition(
    this.toRoute('dashboard'),
    this.use('crossFade'),
    this.reverse('crossFade')
  );
  this.transition(
    this.toRoute('tasks'),
    this.use('toUp')
  );
  this.transition(
    this.toRoute('contacts'),
    this.use('toUp')
  );
  this.transition(
    this.toRoute('contact.summary'),
    this.use('toLeft')
  );
  this.transition(
    this.toRoute('contact.calls'),
    this.use('toLeft')
  );
  this.transition(
    this.toRoute('contact.calls.show'),
    this.use('toDown')
  );
  this.transition(
    this.toRoute('contact.details'),
    this.use('toLeft')
  );
  this.transition(
    this.toRoute('contact.sales'),
    this.use('toLeft')
  );
  this.transition(
    this.toRoute('contact.tags'),
    this.use('toLeft')
  );
  this.transition(
    this.toRoute('contact.interview'),
    this.use('toLeft')
  );
  this.transition(
    this.toRoute('contact.logs'),
    this.use('toLeft')
  );
}
