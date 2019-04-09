
const templateImport = (template) => {
//    const template = "index.template.js"
    return import(/* webpackMode: "eager" */ `../app/templates/${template}`);
}

export default templateImport;
