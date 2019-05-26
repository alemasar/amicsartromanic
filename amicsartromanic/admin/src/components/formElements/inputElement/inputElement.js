/* compile scss then write css */
/* compile HTML then write HTML */

export default class InputElement extends HTMLElement {
  /* static get observedAttributes() {
    return ['checked', 'disabled'];
  } */

  constructor() {
    super();
    console.log('paso input element');
    this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    // this.shadowRoot.appendChild(templateCss.content.cloneNode(true));
    
    this.shadowRoot.appendChild(templateHTML.content.cloneNode(true));
  }
}
