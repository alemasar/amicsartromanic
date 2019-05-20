// import '@webcomponents/webcomponentsjs/webcomponents-loader.js';
import './polyfills/polyfills';
// import "APP/routing";
// import "APP/templates/index.template";
// import "APP/templates/news.template";
// import "COMPONENTS/componentA/componentA.cat";
// import "COMPONENTS/componentB/componentB.cat";

/* import NewsTemplate from "../src/app/templates/news.template"; */
// import {templateImport} from "../src/cat/templateImport"
class App {
  constructor() {
    // super();
    // const template = "index.template";
    /* const templateNews = "news.template"; */
    // import(/* webpackMode: "eager" */ `COMPONENTS/componentB/componentB.cat`)
    WebComponents.waitFor(() => {
      console.log('Paso waitFor');

      const event = new Event('event-webcomponents-polyfill-loaded');
      window.dispatchEvent(event);
      const eventRoute = new Event('popstate');
      window.dispatchEvent(eventRoute);
      // At this point we are guaranteed that all required polyfills have
      // loaded, and can use web components API's.
      // The standard pattern is to load element definitions that call
      // 'customElements.define' here.
      // Note: returning the import's promise causes the custom elements
      // polyfill to wait until all definitions are loaded and then upgrade
      // the document in one batch, for better performance.
      // return import('');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(document.location.pathname);
  new App();
});
