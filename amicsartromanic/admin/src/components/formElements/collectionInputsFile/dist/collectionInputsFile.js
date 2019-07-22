import getComment from '../../../cat-elements/helper/getComments.js';
const templateCss = document.createElement("template");templateCss.innerHTML = `<style>collection-inputs-file {
  border: 1px solid #000;
  display: block; }
</style>`;
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `
<!-- cat-foreach files, file -->
         <input cat-foreach="file in files" is="input-file" type="file" class="form-control-file" id="{{file.id}}" name="{{file.name}}" placeholder="{{file.placeholder}}" />
         <!-- end cat-foreach files, file -->
<!-- cat-foreach bar, foo -->
         <div cat-foreach="foo in bar" class="test">
  <div>Esto es una prueba</div>
  <div class="test1">
    <div>Esto es una prueba</div>
  </div>
  <span>Esto es una prueba</span>
</div>

         <!-- end cat-foreach bar, foo -->`;

export default class CollectionInputsFileElement extends HTMLElement {
  /* static get observedAttributes() {
    return ['checked', 'disabled'];
  } */

  constructor() {
    super();
    this.files = ['HOLA', 'ADEU'];
      this.files = new Proxy (this.files, {
    get(target, key, proxy) {
      console.log('TEMPLATE: ' + key);
      return target[key];
    },
    set(obj, prop, value) {
      if (parseInt(prop)) {
        obj[prop] = value;
        const rootElement = templateHTML.content;
        const lastElem = getComment(
          rootElement,
          `end cat-foreach files, file`
        ).previousSibling;
        let replacedTag = `<input cat-foreach="file in files" is="input-file" type="file" class="form-control-file" id="{{file.id}}" name="{{file.name}}" placeholder="{{file.placeholder}}" />`;
        Object.keys(value).forEach(key => {
          replacedTag = replacedTag.replace(`{{file[key]}}`, value[key]);
        });
        const element = new DOMParser().parseFromString(replacedTag, 'text/html').body.firstChild;
        lastElem.parentNode.insertBefore(element, lastElem.nextSibling);
      }
      return true;
    }
  });
    this.bar = ['HOLA', 'ADEU'];
      this.bar = new Proxy (this.bar, {
    get(target, key, proxy) {
      console.log('TEMPLATE: ' + key);
      return target[key];
    },
    set(obj, prop, value) {
      if (parseInt(prop)) {
        obj[prop] = value;
        const rootElement = templateHTML.content;
        const lastElem = getComment(
          rootElement,
          `end cat-foreach bar, foo`
        ).previousSibling;
        let replacedTag = `<div cat-foreach="foo in bar" class="test">
  <div>Esto es una prueba</div>
  <div class="test1">
    <div>Esto es una prueba</div>
  </div>
  <span>Esto es una prueba</span>
</div>
`;
        Object.keys(value).forEach(key => {
          replacedTag = replacedTag.replace(`{{foo[key]}}`, value[key]);
        });
        const element = new DOMParser().parseFromString(replacedTag, 'text/html').body.firstChild;
        lastElem.parentNode.insertBefore(element, lastElem.nextSibling);
      }
      return true;
    }
  });
    //console.log('paso input collection file element: ', this.files[0]);
    this.files.push({
      id: 'addNewImage',
      name: 'addNewImage',
      placeholder: 'Entra una nova imatge per la noticia'
    });
    this.bar.push({qualsevol: "QUALSEVOL COSA"});
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
