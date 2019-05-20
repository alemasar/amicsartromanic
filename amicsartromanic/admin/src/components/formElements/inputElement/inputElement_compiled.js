/* NO BASE PATH PROVIDED FOR input-text */
/* compile HTML then write HTML */

export default class InputElement extends HTMLInputElement {
  /* static get observedAttributes() {
    return ['checked', 'disabled'];
  } */

  constructor() {
    super();
    console.log('paso input element');
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
