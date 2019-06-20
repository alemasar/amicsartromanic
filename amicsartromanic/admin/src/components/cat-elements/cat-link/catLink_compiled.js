export default class CATLink extends HTMLAnchorElement {
  constructor() {
    super(); // always call super() first in the constructor.
    this.addEventListener('click', e => this.goTo(e));
  }

  goTo(e) {
    e.preventDefault();
    console.log(this.getAttribute('data-link'));
    history.pushState({ page: 0 }, 'title 1', this.getAttribute('data-link'));
    const popStateEvent = new PopStateEvent('popstate', null);
    dispatchEvent(popStateEvent);
  }
}
