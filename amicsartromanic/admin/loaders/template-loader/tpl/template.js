class /* write className */ extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const template = document.createElement("template");
    template.innerHTML = `/* compile template then write template */`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    // if (typeof window.customElements.get("/* write tag */")==="undefined"){
    window.customElements.define('/* write rootTag */-template', i.loadComponent());
    // }
  // });

  // i.loadComponent().then(componentInstance => {

  // });
}
window.addEventListener('event-webcomponents-polyfill-loaded', defineListener, true);
/* write router */