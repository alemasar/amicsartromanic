/* eslint-disable */
class WebComponentHtmlMethods {
  importCatforeach(inputs, args) {
    console.log('ESTOY EN CAT FOREACH!!!!');
    /*return new Promise((resolve, reject) => {
      resolve({
        code: 'ESTOY EN CAT FOREACH!!!!',
        afterResolve: () => {
          console.log('ESTOY EN AFTERRESOLVE');
        }
      });
    });*/
    return new Promise((resolve, reject) => {
      resolve('ESTOY EN CAT FOREACH!!!!')
    });
  }
}

module.exports = WebComponentHtmlMethods;
