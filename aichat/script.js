const sendButton = document.querySelector('button');
const inputField = document.querySelector('input[type="text"]');
const chatMessages = document.querySelector('.chat-messages');

sendButton.addEventListener('click', async () => {
    const userMessage = inputField.value;
    if (userMessage.trim()!== '') {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'user-message');
        messageDiv.textContent = userMessage;
        chatMessages.appendChild(messageDiv);
        const input = inputField.value;
        inputField.value = '';
        let ans;
        try {
            ans = await MdToHTML(await sendRequest(input));
        } catch (error) {
            console.log('Error:', error);
            ans = null;
        }
        setTimeout(() => {
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.classList.add('message', 'ai-message');
            aiMessageDiv.textContent = ans;
            chatMessages.appendChild(aiMessageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
});
