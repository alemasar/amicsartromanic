class Prova {
  constructor() {
    this.component = {};
  }
  loadComponent(){
   
    return import(/* webpackMode: "eager" */ `/* compile js then write path */`);
  }
}
const i = new Prova();

export default i;
console.log("anado el listener")
function defineListener(e) {

  i.loadComponent().then((componentInstance)=>{
    console.log("/* write tag */");
    //if (typeof window.customElements.get("/* write tag */")==="undefined"){
      window.customElements.define("/* write tag */", componentInstance.default);
    //}
  })

 // i.loadComponent().then(componentInstance => {

// });
}
window.addEventListener("event-webcomponents-polyfill-loaded", defineListener, true);
