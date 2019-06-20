import serialize from 'form-serialize';
const templateCss = document.createElement("template");templateCss.innerHTML = `<link rel="stylesheet" href="js/main.css"><style></style>`;
/* data should have required property 'template' */

export default class FormElement extends HTMLFormElement {
  /* static get observedAttributes() {
    return ['checked', 'disabled'];
  } */

  constructor() {
    super();
    console.log('paso form element');
    this.onsubmit = (e) => {
      e.preventDefault();
      //console.log("Faig submit!!! ", this.values);
      const formFiles = new FormData();
      const files = this.querySelector('#addNewImages');

      formFiles.append('news_image', files.files[0]);
      formFiles.append('news_body', this.querySelector('#addNew').value);
      formFiles.append('news_summary', this.querySelector('#addNewSummary').value);
      const url = 'http://admin.localhost:5000/api/addNew';
      console.log(this.querySelector('#addNew').value);
      const headers = new Headers({ 'content-type': 'multipart/form-data' });
      const requestOptions = {
        method: 'POST',
        body: formFiles,
        mode: 'cors',
        cache: 'default'
      };
      fetch(url, requestOptions)
        .then(res => {
          return res.json();
        })
        .catch(error => console.log('Error:', error))
        .then(response => console.log('Success:', response));
    };
  }
}
