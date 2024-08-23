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
    inputField.value = '';
    // 模拟 AI 回复（实际应用中应通过后端获取回复）
    setTimeout(() => {
      const aiMessageDiv = document.createElement('div');
      aiMessageDiv.classList.add('message', 'ai-message');
      aiMessageDiv.textContent = '这是 AI 的回复。';
      chatMessages.appendChild(aiMessageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
});
