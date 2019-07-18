import serialize from 'form-serialize';
const templateCss = document.createElement("template");templateCss.innerHTML = `<style></style>`;
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
      //const data = new FormData();
      const files = this.querySelector('#addNewImages');
      console.log(files.files[0])
      //data.append('image', files.files[0]);
      /*formFiles.append('news_body', this.querySelector('#addNew').value);
      formFiles.append('news_summary', this.querySelector('#addNewSummary').value);*/
      const url = 'http://admin.localhost:5000/api/addNew';
      // const url = 'http://admin.localhost:5000/api/addImage';
      //console.log(this.querySelector('#addNew').value);
      const data = {
        news_body: this.querySelector('#addNew').value,
        news_summary: this.querySelector('#addNewSummary').value,
        news_image: [
          {
            images_path: files.files[0].name,
            images_footer: "Footer de la imatge"
          },
          {
            images_path: files.files[0].name,
            images_footer: "Footer de la imatge"
          }
        ]
      };
      console.log(data)
      //const headers = new Headers({ 'content-type': 'multipart/form-data' });
      const headers = new Headers({ 'content-type': 'application/json' });
      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        //body: data,
        mode: 'cors',
        cache: 'default'
      };
      fetch(url, requestOptions)
        .then(res => {
          return res.json();
        })
        .catch(error => console.log('Error:', error))
        .then(response => {
          console.log('Success:', response);
          
        });
    };
  }
}
