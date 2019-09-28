const templateCss = document.createElement("template");templateCss.innerHTML = `<style>collection-inputs-file {
  border: 1px solid #000;
  display: block; }
</style>`;

        const templateHTML = document.createElement("template");
           templateHTML.innerHTML = `<input cat-foreach="file in files" is="input-text" type="text" class="form-control-file" id="addNewImage1" name="addNewImage" placeholder="Entra una nova \'imatge per la noticia" checked /><input cat-foreach="file in files" is="input-text" type="text" class="form-control-file" id="addNewImage2" name="addNewImage" placeholder="Entra una nova imatge per la noticia" checked /><div cat-foreach="foo in bar" class="test">
  <div>{{foo.message}}</div>
  <div class="test1" cat-foreach="foobar in foo.messages">
    <div>{{foobar.message}}</div>
    <div class="test1" cat-foreach="child in foobar.childs">
      {{child.test}}
    </div>
  </div>
  <span>{{foo.description}}</span>
</div><div cat-foreach="foo in bar" class="test">
  <div>{{foo.message}}</div>
  <div class="test1" cat-foreach="foobar in foo.messages">
    <div>{{foobar.message}}</div>
    <div class="test1" cat-foreach="child in foobar.childs">
      {{child.test}}
    </div>
  </div>
  <span>{{foo.description}}</span>
</div>`;

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
    this.bar = [
      {
        message: 'HOLA',
        description: 'ADEU',
        messages: [
          {
            message: 'CHILD HOLA',
            childs: [
              {
                test: 'CHILD CHILD HOLA'
              }
            ]
          },
          {
            message: 'CHILD HOLA 1',
            childs: [
              {
                test: 'CHILD CHILD HOLA 1'
              }
            ]
          }
        ]
      },
      {
        message: 'ADEU',
        description: 'HOLA',
        messages: [
          {
            message: 'CHILD ADEU',
            childs: [
              {
                test: 'CHILD CHILD ADEU'
              }
            ]
          }
        ]
      }
    ];
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
