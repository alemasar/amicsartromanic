class Prova {
  constructor() {
    this.component = {};
  }
  loadComponent(){
   
    return import(/* webpackMode: "eager" */ `/* compile component then write path */`);
  }
}
const i = new Prova();

export default i;
function defineListener(e) {

  i.loadComponent().then((componentInstance)=>{
    window.customElements.define("/* write tag */", componentInstance.default /* write extends */);
  })

 // i.loadComponent().then(componentInstance => {

// });
}
window.addEventListener("event-webcomponents-polyfill-loaded", defineListener, true);
