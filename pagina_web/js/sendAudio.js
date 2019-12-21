const sendAudioBtn = document.getElementById('sendAudioBtn');
sendAudioBtn.addEventListener('click', sendAudio);

function sendAudio(e) {
  e.preventDefault();
  const audioFile = document.getElementById('audioFile').files[0];
  const originalFormat = audioFile.name.substring(
    audioFile.name.indexOf('.') + 1
  );
  handleFile(audioFile);
  const audioFormats = document.getElementsByName('choosenAudioFormat');
  let choosenFormat;
  audioFormats.forEach(radioElement => {
    if (radioElement.checked) {
      choosenFormat = radioElement.value;
    }
  });

  const improveAudio = document.querySelector('input[name="improve-quality"]')
    .checked;
  const normalizeAudio = document.querySelector('input[name="normalize-audio"]')
    .checked;

  let url = 'http://localhost:3000/convert-audio';
  let method = 'POST';
  const myData = JSON.stringify({
    originalFormat: originalFormat,
    targetFormat: choosenFormat,
    improveAudio: improveAudio,
    normalizeAudio: normalizeAudio
  });

  fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: myData
  })
    .then(data => {
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
