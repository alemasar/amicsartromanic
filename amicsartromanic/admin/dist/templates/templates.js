!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}([,,,,,,,,,,function(e,t,n){n(11),n(12),e.exports=n(13)},function(e,t,n){"use strict";n.r(t);class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const e=document.createElement("template");e.innerHTML='<link href="templates/css/main.css" rel="stylesheet" type="text/css"><link href="templates/css/bootstrap-material-design.css" rel="stylesheet" type="text/css">\nESTO ES INDEX\n<div class="container-fluid">\n  <form is="form-element" id="newComponentForm">\n    \x3c!-- write element with index 1 --\x3e\n<div class="form-group">\n  <label for="addFormComponentName">Component name:</label>\n  <input is = "input-text" type = "text" class = "form-control" id = "addFormComponentName" name = "component_name" placeholder = "Enter component name"/>\n</div>\n\x3c!-- end write element --\x3e\n\x3c!-- write element with index 2 --\x3e\n<div class="form-group">\n  <label for="addFormComponentTag">Component tag:</label>\n  <input is = "input-text" type = "text" class = "form-control" id = "addFormComponentTag" name = "component_tag" placeholder = "Enter component tag"/>\n</div>\n\x3c!-- end write element --\x3e\n\x3c!-- write element with index 3 --\x3e\n<div class="form-group">\n  <label for="addFormComponentScssPath">Component scss path:</label>\n  <input is = "input-text" type = "text" class = "form-control" id = "addFormComponentScssPath" name = "component_scss_path" placeholder = "Enter component scss path"/>\n</div>\n\x3c!-- end write element --\x3e\n\x3c!-- write element with index 4 --\x3e\n<div class="form-group">\n  <label for="addFormComponentJSPath">Component js path:</label>\n  <input is = "input-text" type = "text" class = "form-control" id = "addFormComponentJSPath" name = "component_js_path" placeholder = "Enter component js path"/>\n</div>\n\x3c!-- end write element --\x3e\n\x3c!-- write element with index 5 --\x3e\n<div class="form-group">\n  <label for="addFormComponentTemplatePath">Component template path:</label>\n  <input is = "input-text" type = "text" class = "form-control" id = "addFormComponentTemplatePath" name = "component_template_path" placeholder = "Enter component template path"/>\n</div>\n\x3c!-- end write element --\x3e\n\n    <button type="submit" class="btn btn-primary" id="submitButton">Submit</button>\n  </form>\n</div>\n',this.shadowRoot.appendChild(e.content.cloneNode(!0));const t=document.querySelector("app-template"),n=t.parentNode,o=document.createElement("app-template-deleted");n.insertBefore(o,t),n.removeChild(t);const l=document.createElement("app-template");n.insertBefore(l,o),n.removeChild(o),document.querySelector("app-template").attachShadow({mode:"open"}).appendChild(this.shadowRoot)}}const l=new class{constructor(){this.component={}}loadComponent(){return o}loadComponents(){console.log("Paso per template loadComponent")}};t.default=l,console.log("anado el listener"),window.addEventListener("event-webcomponents-polyfill-loaded",function(e){console.log("index-template"),window.customElements.define("index-template",l.loadComponent())},!0),window.addEventListener("popstate",function(e){if("/"===document.location.pathname){console.log("popstate fired!",document.location.pathname),console.log("passsoo popstate event","/");new o}})},function(e,t,n){"use strict";n.r(t);class o extends HTMLElement{constructor(){super(),console.log("PASO PER NO ROUTER TEMPLATE"),this.attachShadow({mode:"open"});const e=document.createElement("template");e.innerHTML='<ul class="nav nav-tabs bg-dark">\n  <li class="nav-item">\n    <a is="cat-link" class="nav-link active" href="/" data-link="/">Index</a>\n  </li>\n  <li class="nav-item">\n    <a is="cat-link" class="nav-link" href="/news" data-link="/news">News</a>\n  </li>\n</ul>\n',console.log("TEMPLATE"+e.innerHTML),this.shadowRoot.appendChild(e.content.cloneNode(!0));const t=document.querySelector("menu-template");console.log(t);const n=t.parentNode,o=document.createElement("menu-template-deleted");n.insertBefore(o,t),n.removeChild(t);const l=document.createElement("menu-template");n.insertBefore(l,o),n.removeChild(o),document.querySelector("menu-template").attachShadow({mode:"open"}).appendChild(this.shadowRoot)}}const l=new class{constructor(){this.component={}}loadComponent(){return o}loadComponents(){console.log("Paso per template loadComponent")}};t.default=l,console.log("anado el listener"),window.addEventListener("event-webcomponents-polyfill-loaded",function(e){window.customElements.define("nav-template",o);const t=document.querySelector("menu-template"),n=document.createElement("nav-template");t.appendChild(n)},!0)},function(e,t,n){"use strict";n.r(t);class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const e=document.createElement("template");e.innerHTML='<link href="templates/css/main.css" rel="stylesheet" type="text/css"><link href="templates/css/bootstrap-material-design.css" rel="stylesheet" type="text/css">\nESTO ES NEWS\n<div class="container-fluid">\n  <form is="form-element" id="addNewForm">\n    \x3c!-- write element with index 1 --\x3e\n<div class="form-group">\n    <label for="addNew">Notícia:</label>\n    <input is = "input-text" type = "text" class = "form-control" id = "addNew" name = "new" placeholder = "Entra la notícia"/>\n  </div>\n  \x3c!-- end write element --\x3e\n  \x3c!-- write element with index 2 --\x3e\n  <div class="form-group">\n    <label for="addNewSummary">Resum de la notícia:</label>\n    <input is = "input-text" type = "text" class = "form-control" id = "addNewSummary" name = "summary" placeholder = "Entra el resum de la notícia"/>\n  </div>\n  \x3c!-- end write element --\x3e\n  \x3c!-- write element with index 3 --\x3e\n  <div class="form-group">\n    <label for="collection-controls-file">Imatges de la notícia:</label>\n    <collection-inputs-file class = "collection-controls-file" id = "collection-controls-file"/>\n  </div>\n  \x3c!-- end write element --\x3e\n\n    <button type="submit" class="btn btn-primary" id="submitButton">Submit</button>\n  </form>\n</div>\n',this.shadowRoot.appendChild(e.content.cloneNode(!0));const t=document.querySelector("app-template"),n=t.parentNode,o=document.createElement("app-template-deleted");n.insertBefore(o,t),n.removeChild(t);const l=document.createElement("app-template");n.insertBefore(l,o),n.removeChild(o),document.querySelector("app-template").attachShadow({mode:"open"}).appendChild(this.shadowRoot)}submitForm(){console.log(this)}}const l=new class{constructor(){this.component={}}loadComponent(){return o}loadComponents(){console.log("Paso per template loadComponent")}};t.default=l,console.log("anado el listener"),window.addEventListener("event-webcomponents-polyfill-loaded",function(e){console.log("news-template"),window.customElements.define("news-template",l.loadComponent())},!0),window.addEventListener("popstate",function(e){if("/news"===document.location.pathname){console.log("popstate fired!",document.location.pathname),console.log("passsoo popstate event","/news");new o}})}]);
//# sourceMappingURL=templates.js.map