//版本1.0.3
function calculateMd5(inputString) {
  const hash = crypto.createHash('md5');
  hash.update(inputString);
  return hash.digest('hex');
}

function genToken(reqText) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  const dateMd5 = calculateMd5(formattedDate).substring(0, 5);
  return calculateMd5(reqText + dateMd5);
}

function sendRequest(prompt) {
  const myHeaders = new Headers();
  myHeaders.append("ca", "20303983-1dd0-4b0a-9a97-0b6abf4cb5e6");

  const token = genToken(prompt);

  const raw = JSON.stringify({
    "prompt": prompt,
    "token": token,
    "stream": false
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://ai.coludai.cn/api/chat", requestOptions)
   .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
   .then(result => {
      const data = JSON.parse(result);
      return data.output;
    })
   .catch(error => {
      console.log('Error:', error);
      return null;
    });
}
