import serialize from 'form-serialize';
// eslint-disable-next-line prettier/prettier
window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-line no-undef
  console.log('DOMCONTENTLOADED');
  // eslint-disable-next-line prettier/prettier
  document.getElementById('submitButton').addEventListener('click', e => {
    // eslint-disable-line no-undef
    e.preventDefault();
    console.log('SUBMIT one');
    console.log(serialize(document.getElementById('newComponentForm'), { hash: true }));
    const url = 'http://127.0.0.1:5000/api/add';
    const data = serialize(document.getElementById('newComponentForm'), { hash: true });
    console.log(data);
    /*   const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true)
 xhr.withCredentials = true;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 2) {
        console.log("HOLA")
      }
    }
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(data);*/

    const headers = new Headers({ 'content-type': 'application/json' });

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
      mode: 'cors',
      cache: 'default'
    };

    fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })
      .catch(error => console.log('Error:', error))
      .then(response => console.log('Success:', response));
  });
});

if (typeof module.hot !== 'undefined') {
  module.hot.accept(); // eslint-disable-line no-undef
}
