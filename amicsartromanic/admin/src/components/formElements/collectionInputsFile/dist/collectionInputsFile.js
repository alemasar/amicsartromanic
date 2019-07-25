import getComment from '../../../cat-elements/helper/getComments.js';
import insertNodes from '../../../cat-elements/helper/insertNodes.js';
const templateCss = document.createElement("template");templateCss.innerHTML = `<style>collection-inputs-file {
  border: 1px solid #000;
  display: block; }
</style>`;
const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `
<!-- cat-foreach files, file -->
         <input  is="input-file" type="file" class="form-control-file" id="addNewImage1" id="{{file.id}}" name="addNewImage" placeholder="Entra una nova \'imatge per la noticia" /><input  is="input-file" type="file" class="form-control-file" id="addNewImage2" id="{{file.id}}" name="addNewImage" placeholder="Entra una nova imatge per la noticia" />
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
  {
    get(obj, prop, proxy) {
      console.log(prop)
      if (typeof obj[prop] === 'function') {
        return function (el) {
          const rootElement = templateHTML.content;
          const firstElem = getComment(
            rootElement,
            `cat-foreach files, file`
          );
          const lastElem = getComment(
            rootElement,
            `end cat-foreach files, file`
          );
          let firstNode = firstElem.nextSibling;
          let arrayNodes = [];
          console.log(firstNode)

          while (firstNode !== lastElem){
            if (firstNode.nodeType !== 3){
              arrayNodes.push(firstNode);
            }
            firstNode = firstNode.nextSibling;
          }
          console.log("ARRAY NODES: ",arrayNodes);
          let returnArray = [];
          if (Object.values(arguments).length > 0){
            let replacedTag = '';
            if (Object.values(arguments)[0].length > 0){
              console.log("PROPIEDAD: ", prop);
              Object.values(arguments)[0].forEach(argument => {
                let tempTag = `<input cat-foreach="file in files" is="input-file" type="file" class="form-control-file" id="{{file.id}}" id="{{file.id}}" name="{{file.name}}" placeholder="{{file.placeholder}}" />`;
                Object.keys(argument).forEach(key => {
                  const regAttributte = new RegExp('{{file.'+key+'}}', 'gi')
                  tempTag = tempTag.replace(regAttributte, argument[key]);
                });
                replacedTag += tempTag;
              });
              const domObj = new DOMParser().parseFromString(replacedTag, "text/html");
              console.log("ARRAY NODES: ",arrayNodes);
              arrayNodes = Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
              insertNodes(arrayNodes, firstElem, lastElem);
              return new Proxy (Object.assign(Array.prototype[prop].apply(obj, Object.values(arguments)[0]), {
                _originalHandler: obj._originalHandler,
                _originalTarget: obj._originalTarget
              }), obj._originalHandler);
            } else {
              let tempTag = `<input cat-foreach="file in files" is="input-file" type="file" class="form-control-file" id="{{file.id}}" id="{{file.id}}" name="{{file.name}}" placeholder="{{file.placeholder}}" />`;
              const insertElement = Object.values(arguments)[0];
              Object.keys(insertElement).forEach(key => {
                const regAttributte = new RegExp('{{file.'+key+'}}', 'gi')
                tempTag = tempTag.replace(regAttributte, insertElement[key]);
              });
              const domObj = new DOMParser().parseFromString(tempTag, "text/html");
              Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
              insertNodes(arrayNodes, firstElem, lastElem);
              return Array.prototype[prop].apply(obj, Object.values(arguments));
            }
          }
          console.log("PROPIEDAD: ",prop);
          Array.prototype[prop].apply(arrayNodes);
          insertNodes(arrayNodes, firstElem, lastElem);
          return Array.prototype[prop].apply(obj, arguments);
      }

    }
    return obj[prop];
    },
    set(obj, prop, value) {
      console.log("PASO PER AQUI", prop)
      return true;
    },
    deleteProperty: function (obj, prop) {
      console.log("PASO PER AQUI ????????", prop)
    }
  }
  ;
      this.files = new Proxy (Object.assign(this.files, {
        _originalHandler: handlerfiles,
        _originalTarget: this.files
      }), handlerfiles);
    this.bar = ['HOLA', 'ADEU'];
      const handlerbar = 
  {
    get(obj, prop, proxy) {
      console.log(prop)
      if (typeof obj[prop] === 'function') {
        return function (el) {
          const rootElement = templateHTML.content;
          const firstElem = getComment(
            rootElement,
            `cat-foreach bar, foo`
          );
          const lastElem = getComment(
            rootElement,
            `end cat-foreach bar, foo`
          );
          let firstNode = firstElem.nextSibling;
          let arrayNodes = [];
          console.log(firstNode)

          while (firstNode !== lastElem){
            if (firstNode.nodeType !== 3){
              arrayNodes.push(firstNode);
            }
            firstNode = firstNode.nextSibling;
          }
          console.log("ARRAY NODES: ",arrayNodes);
          let returnArray = [];
          if (Object.values(arguments).length > 0){
            let replacedTag = '';
            if (Object.values(arguments)[0].length > 0){
              console.log("PROPIEDAD: ", prop);
              Object.values(arguments)[0].forEach(argument => {
                let tempTag = `<div cat-foreach="foo in bar" class="test">
  <div>Esto es una prueba</div>
  <div class="test1">
    <div>Esto es una prueba</div>
  </div>
  <span>Esto es una prueba</span>
</div>
`;
                Object.keys(argument).forEach(key => {
                  const regAttributte = new RegExp('{{foo.'+key+'}}', 'gi')
                  tempTag = tempTag.replace(regAttributte, argument[key]);
                });
                replacedTag += tempTag;
              });
              const domObj = new DOMParser().parseFromString(replacedTag, "text/html");
              console.log("ARRAY NODES: ",arrayNodes);
              arrayNodes = Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
              insertNodes(arrayNodes, firstElem, lastElem);
              return new Proxy (Object.assign(Array.prototype[prop].apply(obj, Object.values(arguments)[0]), {
                _originalHandler: obj._originalHandler,
                _originalTarget: obj._originalTarget
              }), obj._originalHandler);
            } else {
              let tempTag = `<div cat-foreach="foo in bar" class="test">
  <div>Esto es una prueba</div>
  <div class="test1">
    <div>Esto es una prueba</div>
  </div>
  <span>Esto es una prueba</span>
</div>
`;
              const insertElement = Object.values(arguments)[0];
              Object.keys(insertElement).forEach(key => {
                const regAttributte = new RegExp('{{foo.'+key+'}}', 'gi')
                tempTag = tempTag.replace(regAttributte, insertElement[key]);
              });
              const domObj = new DOMParser().parseFromString(tempTag, "text/html");
              Array.prototype[prop].apply(arrayNodes, domObj.body.childNodes);
              insertNodes(arrayNodes, firstElem, lastElem);
              return Array.prototype[prop].apply(obj, Object.values(arguments));
            }
          }
          console.log("PROPIEDAD: ",prop);
          Array.prototype[prop].apply(arrayNodes);
          insertNodes(arrayNodes, firstElem, lastElem);
          return Array.prototype[prop].apply(obj, arguments);
      }

    }
    return obj[prop];
    },
    set(obj, prop, value) {
      console.log("PASO PER AQUI", prop)
      return true;
    },
    deleteProperty: function (obj, prop) {
      console.log("PASO PER AQUI ????????", prop)
    }
  }
  ;
      this.bar = new Proxy (Object.assign(this.bar, {
        _originalHandler: handlerbar,
        _originalTarget: this.bar
      }), handlerbar);
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

    /* this.files[1] = {
      id: 'CambioelID',
      name: 'addNewImage',
      placeholder: 'Entra una nova imatge per la noticia'
    }; */
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
