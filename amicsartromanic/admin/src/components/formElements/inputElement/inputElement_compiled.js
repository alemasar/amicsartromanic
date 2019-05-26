/* TypeError: Cannot read property 'css' of undefined */
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `<input
type="text"
class="form-control"
id="addFormComponentName"
name="component_name"
placeholder="Enter component name"
/>`;

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
    const css = new CSSStyleSheet();
    css.replaceSync('@import url( ~/sass/app.scss )');
    this.shadowRoot.adoptedStyleSheets = [css];
    this.shadowRoot.appendChild(templateHTML.content.cloneNode(true));
  }
}
