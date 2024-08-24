const sendButton = document.querySelector('button');
const inputField = document.querySelector('input[type="text"]');
const chatMessages = document.querySelector('.chat-messages');

sendButton.addEventListener('click', async () => {
    const userMessage = inputField.value.trim();
    if (userMessage!== '') {
        addMessage(userMessage, 'user');
        inputField.value = '';
        sendButton.disabled = true;
        let ans;
        try {
            ans = await MdToHTML(await sendRequest(userMessage));
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.classList.add('message', 'ai-message');
            aiMessageDiv.innerHTML = ans;
            chatMessages.appendChild(aiMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.log('Error:', error);
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.classList.add('message', 'ai-message');
            errorMessageDiv.textContent = '渲染出现错误了，请稍后再试';
            chatMessages.appendChild(errorMessageDiv);
        }
        sendButton.disabled = false;
    }
});
