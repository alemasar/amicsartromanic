const templateCss = document.createElement("template");templateCss.innerHTML = `<link rel="stylesheet" href="js/main.css"><style></style>`;
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `<!-- write element with index 1 -->
<div class="form-group">
  <label for="{{ id }}">{{ label }}</label>
  {{ tag }}
</div>
<!-- end write element -->
<!-- write element with index 2 -->
<div class="form-group">
  <label for="{{ id }}">{{ label }}</label>
  {{ tag }}
</div>
<!-- end write element -->
<!-- write element with index 3 -->
<div class="form-group">
  <label for="{{ id }}">{{ label }}</label>
  {{ tag }}
</div>
<!-- end write element -->
<!-- write element with index 4 -->
<div class="form-group">
  <label for="{{ id }}">{{ label }}</label>
  {{ tag }}
</div>
<!-- end write element -->
<!-- write element with index 5 -->
<div class="form-group">
  <label for="{{ id }}">{{ label }}</label>
  {{ tag }}
</div>
<!-- end write element -->
`;

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
