document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages-container');
    const messageInput = document.getElementById('message');
    const sendButton = document.getElementById('send-message');
    const usernameInput = document.getElementById('username');
    const setUsernameButton = document.getElementById('set-username');
  
    let username = localStorage.getItem('username') || 'Guest';
  
    // Display existing messages on page load
    function displayMessages() {
      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      messagesContainer.innerHTML = '';
      messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<span class="username">${message.username}:</span> ${message.text}`;
        messagesContainer.appendChild(messageDiv);
      });
      messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the bottom
    }
  
    // Send a new message
    function sendMessage() {
      const messageText = messageInput.value.trim();
      if (messageText === '') return;
  
      const newMessage = {
        username,
        text: messageText,
        timestamp: new Date().toISOString()
      };
  
      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.push(newMessage);
      localStorage.setItem('messages', JSON.stringify(messages));
  
      messageInput.value = ''; // Clear input field
      displayMessages(); // Refresh messages view
    }
  
    // Set a new username
    function setUsername() {
      const newUsername = usernameInput.value.trim();
      if (newUsername === '') return;
      username = newUsername;
      localStorage.setItem('username', username);
      usernameInput.value = ''; // Clear input field
    }
  
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
    setUsernameButton.addEventListener('click', setUsername);
  
    // Initialize the chat
    displayMessages();
  });  