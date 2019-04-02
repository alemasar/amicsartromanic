class Prova {
  constructor() {
    this.component = {};
    import(/* webpackMode: "eager" */ `/* compile js then write path */`).then(
      component => {
        console.log(component);
        this.component = component.default;
      }
    );
  }
}
const i = new Prova();
export default i;
document.addEventListener("DOMContentLoaded", e => {
  console.log(i.component);
  WebComponents.waitFor(() => {
    console.log(i.component);
    window.customElements.define("/* write tag */", i.component);
    // At this point we are guaranteed that all required polyfills have
    // loaded, and can use web components API's.
    // The standard pattern is to load element definitions that call
    // 'customElements.define' here.
    // Note: returning the import's promise causes the custom elements
    // polyfill to wait until all definitions are loaded and then upgrade
    // the document in one batch, for better performance.
    // return import('');
  });
});
