!function(o){var t={};function e(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return o[n].call(c.exports,c,c.exports,e),c.l=!0,c.exports}e.m=o,e.c=t,e.d=function(o,t,n){e.o(o,t)||Object.defineProperty(o,t,{enumerable:!0,get:n})},e.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},e.t=function(o,t){if(1&t&&(o=e(o)),8&t)return o;if(4&t&&"object"==typeof o&&o&&o.__esModule)return o;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:o}),2&t&&"string"!=typeof o)for(var c in o)e.d(n,c,function(t){return o[t]}.bind(null,c));return n},e.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(t,"a",t),t},e.o=function(o,t){return Object.prototype.hasOwnProperty.call(o,t)},e.p="",e(e.s=29)}({29:function(o,t,e){e(30),o.exports=e(31)},30:function(o,t,e){"use strict";e.r(t);class n{constructor(){document.getElementById("app").innerHTML='<h2>INDEX TEMPLATE</h2>\n<howto-checkbox id="join-checkbox"></howto-checkbox><howto-label for="<howto-checkbox-id>">Join Newsletter</howto-label>\n<howto-checkbox-twitter id="join-checkbox-twitter"></howto-checkbox-twitter><howto-label-twitter for="<howto-checkbox-id>">Join Facebook</howto-label-twitter>'}loadComponents(){console.log("Paso per template loadComponent");const o=new Event("event-howto-checkbox");document.dispatchEvent(o);const t=new Event("event-howto-checkbox-twitter");document.dispatchEvent(t)}}t.default=n,document.addEventListener("DOMContentLoaded",()=>{console.log("Cargado")}),window.addEventListener("popstate",function(o){if("/"===document.location.pathname){console.log("popstate fired!",document.location.pathname),console.log("passsoo popstate event","/"),(new n).loadComponents()}})},31:function(o,t){o.exports='<h2>INDEX TEMPLATE</h2>\n<howto-checkbox id="join-checkbox"></howto-checkbox><howto-label for="<howto-checkbox-id>">Join Newsletter</howto-label>\n<howto-checkbox-twitter id="join-checkbox-twitter"></howto-checkbox-twitter><howto-label-twitter for="<howto-checkbox-id>">Join Facebook</howto-label-twitter>'}});
//# sourceMappingURL=templates.js.map