export default class InputElement extends HTMLAnchorElement {
  constructor() {
    super(); // always call super() first in the constructor.
    this.addEventListener('click', e => this.goTo(e));
  }

  goTo(e) {
   // e.preventDefault();
    history.pushState({ page: 0 }, 'title 1', this.href);
  }
}
