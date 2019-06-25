const templateCss = document.createElement("template");templateCss.innerHTML = `<style>collection-inputs-file {
  border: 1px solid #000;
  display: block; }
</style>`;
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `<!-- import cat-foreach -->
<input cat-foreach="file in files" is="input-file" type="file" class="form-control-file" id="addNewImages" name="images" placeholder="Entra les imatges de la noticia">`;

export default class CollectionInputsFileElement extends HTMLElement {
  /* static get observedAttributes() {
    return ['checked', 'disabled'];
  } */

  constructor() {
    super();
    console.log('paso input file element');
    if (templateCss) {
      this.appendChild(templateCss.content.cloneNode(true));
    }
    if (templateHTML) {
      this.appendChild(templateHTML.content.cloneNode(true));
    }
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
