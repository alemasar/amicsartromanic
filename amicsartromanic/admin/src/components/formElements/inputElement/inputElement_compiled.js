const templateCss = document.createElement("template");templateCss.innerHTML = `<link rel="stylesheet" href="js/main.css"><style></style>`;
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `<input
type="text"
class="form-control"
id="addFormComponentName"
name="component_name"
placeholder="Enter component name"
/>`;

export default class InputElement extends HTMLInputElement {
  /* static get observedAttributes() {
    return ['checked', 'disabled'];
  } */

  constructor() {
    super();
    console.log('paso input element');
    //this.attachShadow({ mode: 'open' });
    // console.log(this.cat)
    // this.shadowRoot.appendChild(templateCss.content.cloneNode(true));
    // templateHTML.content.appendChild('<style> @import "../../../../sass/app.scss"; </style>');
    /* const css = document.createElement('style');
    css.type = 'text/css';

    const styles = '@import "./main.css"';

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    templateHTML.content.appendChild(css); */
    // const template = document.createElement("template");
   // template.appendChild(templateCss.content.cloneNode(true));
    /*template.appendChild(templateHTML.content.cloneNode(true));
    console.log(templateHTML)
    this.innerHTML = templateHTML.innerHTML;*/
   // console.log(this.shadowRoot);
  }
}
