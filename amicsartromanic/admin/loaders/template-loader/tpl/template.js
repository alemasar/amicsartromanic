class /* write className */ extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement("template");
    template.innerHTML = `/* compile template then write template */`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const elem = document.querySelector('/* write routerTag */-template');
    const parentElement = elem.parentNode;
    const tmpNode = document.createElement('/* write routerTag */-template-deleted');
    parentElement.insertBefore(tmpNode, elem);
    parentElement.removeChild(elem);
    const host = document.createElement('/* write routerTag */-template');
    parentElement.insertBefore(host, tmpNode);
    parentElement.removeChild(tmpNode);
    const hostShadowDOM = document.querySelector('/* write routerTag */-template').attachShadow({mode: 'open'});
    hostShadowDOM.appendChild(this.shadowRoot);
  }
}

class Prova {
  constructor() {
    this.component = {};
  }

  loadComponent() {
    return /* write className */;
  }

  loadComponents(){
    console.log("Paso per template loadComponent")
    /* write events */
  }
}
const i = new Prova();

export default i;
console.log('anado el listener');
function defineListener(e) {
  // i.loadComponent().then(componentInstance => {
    console.log('/* write tag */');
  //  if (typeof window.customElements.get('/* write rootTag */-template')==="undefined"){
      window.customElements.define('/* write tag */', i.loadComponent());
  //  }
  // });

  // i.loadComponent().then(componentInstance => {

  // });
}
window.addEventListener('event-webcomponents-polyfill-loaded', defineListener, true);
/* write router */