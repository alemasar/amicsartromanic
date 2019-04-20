import serialize from 'form-serialize';

// eslint-disable-next-line prettier/prettier
window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-line no-undef
  console.log('DOMCONTENTLOADED');
  // eslint-disable-next-line prettier/prettier
  document.getElementById('submitButton').addEventListener('click', e => {
    // eslint-disable-line no-undef
    e.preventDefault();
    console.log('SUBMIT');
    console.log(serialize(document.getElementById('newComponentForm'), { hash: true }))
    const url = 'https://example.com/profile';
    const data = serialize(document.getElementById('newComponentForm'), { hash: true });
/*
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));*/
  });
});

if (typeof module.hot !== 'undefined') {
  module.hot.accept(); // eslint-disable-line no-undef
}
