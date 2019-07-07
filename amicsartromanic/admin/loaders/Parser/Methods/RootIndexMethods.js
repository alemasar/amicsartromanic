/* eslint-disable */

class RootIndexMethods {
  writeTag(inputs, args) {
    console.log('PASO PER WRITETAG!!!!');
    return new Promise((resolve, reject) => {
      resolve('WRITETAG');
    });
  }
  compileComponent(inputs, args) {
    console.log('PASO PER COMPILECOMPONENT!!!!');
    return new Promise((resolve, reject) => {
      resolve('COMPILECOMPONENT');
    });
  }
  writePath(inputs, args, promise) {
    console.log('PASO PER WRITEPATH!!!!', promise);
    return new Promise((resolve, reject) => {
      resolve('WRITEPATH');
    });
  }
  writeTest(inputs, args, promise) {
    console.log('PASO PER WRITETEST!!!!', promise);
    return new Promise((resolve, reject) => {
      resolve('WRITETEST');
    });
  }
}

module.exports = RootIndexMethods;
