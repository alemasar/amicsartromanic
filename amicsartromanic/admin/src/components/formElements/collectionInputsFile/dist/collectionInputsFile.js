import getProxyFunction from '../../../cat-elements/helper/getProxyFunction.js';

                         import proxyHandlerObj from '../../../cat-elements/helper/getProxyHandler.js';

                         import getNodes from '../../../cat-elements/helper/getNodes.js';
const templateCss = document.createElement("template");templateCss.innerHTML = `<style>collection-inputs-file {
  border: 1px solid #000;
  display: block; }
</style>`;
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `
<!-- cat-foreach files, file -->
         <input  is="input-text" type="text" class="form-control-file" id="addNewImage1" id="{{file.id}}" name="addNewImage" placeholder="Entra una nova \'imatge per la noticia" /><input  is="input-text" type="text" class="form-control-file" id="addNewImage2" id="{{file.id}}" name="addNewImage" placeholder="Entra una nova imatge per la noticia" />
         <!-- end cat-foreach files, file -->
<!-- cat-foreach bar, foo -->
         <div  class="test">
  <div>Esto es una prueba</div>
  <div class="test1">
    <div>Esto es una prueba</div>
  </div>
  <span>Esto es una prueba</span>
</div>
<div  class="test">
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
    this.files = [
      {
        id: 'addNewImage1',
        name: 'addNewImage',
        placeholder: 'Entra una nova \'imatge per la noticia'
      },
      {
        id: 'addNewImage2',
        name: 'addNewImage',
        placeholder: 'Entra una nova imatge per la noticia'
      }
    ];
      const handlerfiles = 
  (originalObj) => {
    let t = originalObj;
    const arrayNodes = getNodes(templateHTML.content, 'files', 'file');
    console.log(arrayNodes)
    return new Proxy(t, proxyHandlerObj(arrayNodes, `<input  is="input-text" type="text" class="form-control-file" id="{{file.id}}" id="{{file.id}}" name="{{file.name}}" placeholder="{{file.placeholder}}" />`));
  }
  ;
      this.files = handlerfiles(this.files)
    this.bar = ['HOLA', 'ADEU'];
      const handlerbar = 
  (originalObj) => {
    let t = originalObj;
    const arrayNodes = getNodes(templateHTML.content, 'bar', 'foo');
    console.log(arrayNodes)
    return new Proxy(t, proxyHandlerObj(arrayNodes, `<div  class="test">
  <div>Esto es una prueba</div>
  <div class="test1">
    <div>Esto es una prueba</div>
  </div>
  <span>Esto es una prueba</span>
</div>
`));
  }
  ;
      this.bar = handlerbar(this.bar)
    //console.log('paso input collection file element: ', this.files[0]);
    this.files.push({
      id: 'addNewImage3',
      name: 'addNewImage',
      placeholder: 'Entra una nova imatge per la noticia'
    });
    console.log('DESPUES DEL PUSH ', this.files);
    this.files = this.files.concat([
      {
        id: 'addNewImage4',
        name: 'addNewImage',
        placeholder: 'Entra una nova imatge per la noticia'
      },
      {
        id: 'addNewImage5',
        name: 'addNewImage',
        placeholder: 'Entra una nova imatge per la noticia'
      }
    ]);
    console.log('DESPUES DEL CONCAT ', this.files);
    this.files.pop();
    console.log('DESPUES DEL POP ', this.files);
    //this.bar.push({ qualsevol: 'QUALSEVOL COSA' });

    this.files[1] = {
      id: 'CambioelID',
      name: 'addNewImage',
      placeholder: 'Entra una nova imatge per la noticia'
    };
    console.log('DESPUES DE LA ASIGNACION ', this.files);
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
