// 版本 1.0.8
console.log("版本1.0.8");

// 引入 CryptoJS 库
const CryptoJS = window.CryptoJS;

function calculateMd5(inputString) {
  // 使用 CryptoJS 的 MD5 方法
  return CryptoJS.MD5(inputString).toString(CryptoJS.enc.Hex);
}

function genToken(reqText) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  const dateMd5 = calculateMd5(formattedDate).substring(0, 6);
  return calculateMd5(reqText + dateMd5);
}

function sendRequest(prompt) {
  const myHeaders = {
    'ca': '20303983-1dd0-4b0a-9a97-0b6abf4cb5e6'
  };

  const token = genToken(prompt);

  const data = {
    "prompt": prompt,
    "token": token,
    "stream": false
  };

  return axios.post("https://ai.coludai.cn/api/chat", data, {
    headers: myHeaders
  })
   .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.data.output;
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    })
   .catch(error => {
      console.log('Error:', error);
      return "暂时无法完成请求，请稍后再试";
    });
}
