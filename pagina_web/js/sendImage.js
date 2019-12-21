const sendImageBtn = document.getElementById('sendImageBtn');

sendImageBtn.addEventListener('click', sendImage);

function sendImage(e) {
  e.preventDefault();
  const imageFile = document.getElementById('imageFile').files[0];
  handleFile(imageFile);
  const originalFormat = imageFile.type.substring(6);
  const imageFormats = document.getElementsByName('choosenImageFormat');
  let choosenFormat;
  imageFormats.forEach(radioElement => {
    if (radioElement.checked) {
      choosenFormat = radioElement.value;
    }
  });
  const colors = document.getElementsByName('choosenColor');
  let color;
  colors.forEach(radioElement => {
    if (radioElement.checked) {
      color = radioElement.value;
    }
  });
  const crops = document.querySelectorAll('input[name^="crop-"]');
  const cropsArray = []; // [arriba, abajo, izquierda, derecha]
  crops.forEach(crop => {
    const valueInPx = crop.value;
    if (valueInPx === '') {
      cropsArray.push(0);
    } else {
      cropsArray.push(+crop.value);
    }
  });

  let url = 'http://localhost:3000/convert-image'; // ENDPOINT
  let method = 'POST';
  const myData = JSON.stringify({
    originalFormat: originalFormat,
    targetFormat: choosenFormat,
    color: color,
    cropsArray: cropsArray
  });

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: myData
  })
    .then(data => {
      console.log(myData);
      alert('Datos enviados al servidor');
    })
    .catch(err => {
      console.log(err);
    });
}

function handleFile(file) {
  if (file) {
    var r = new FileReader();
    r.onload = function(e) {
      const binaryData = e.target.result;
      // console.log(binaryData);
    };

    r.readAsText(file);
  }
}
