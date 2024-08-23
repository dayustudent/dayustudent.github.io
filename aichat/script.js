const { sendRequest } = require('./chat.js'); //引入后端聊天处理代码

const sendButton = document.querySelector('button');
const inputField = document.querySelector('input[type="text"]');
const chatMessages = document.querySelector('.chat-messages');

sendButton.addEventListener('click', () => {
  const userMessage = inputField.value;
  if (userMessage.trim()!== '') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user-message');
    messageDiv.textContent = userMessage;
    chatMessages.appendChild(messageDiv);
    const input = inputField.value;
    sendRequest(input).then(answer => { if (answer) {var ans = answer;});
    inputField.value = '';
    setTimeout(() => {
      const aiMessageDiv = document.createElement('div');
      aiMessageDiv.classList.add('message', 'ai-message');
      aiMessageDiv.textContent = ans;
      chatMessages.appendChild(aiMessageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
});
