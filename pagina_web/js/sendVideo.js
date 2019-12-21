const sendVideoBtn = document.getElementById('sendVideoBtn');
sendVideoBtn.addEventListener('click', sendVideo);

function sendVideo(e) {
  e.preventDefault();
  const videoFile = document.getElementById('videoFile').files[0];
  handleFile(videoFile);
  const originalFormat = videoFile.type.substring(6);
  const videoFormats = document.getElementsByName('choosenVideoFormat');
  let choosenFormat;
  videoFormats.forEach(radioElement => {
    if (radioElement.checked) {
      choosenFormat = radioElement.value;
    }
  });
  const quitAudio = document.querySelector('input[name="quit-audio"]').checked;
  const createThumbnail = document.querySelector(
    'input[name="create-thumbnail"]'
  ).checked;

  let url = 'http://localhost:3000/convert-video';
  let method = 'POST';
  const myData = JSON.stringify({
    originalFormat: originalFormat,
    targetFormat: choosenFormat,
    quitAudio: quitAudio,
    createThumbnail: createThumbnail
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
