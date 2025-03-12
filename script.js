document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const userMessage = document.getElementById("user-input").value.trim();
  if (userMessage === "") return;

  displayMessage(userMessage, "user");
  document.getElementById("user-input").value = "";

  // Call the Flask API to get the AI response
  fetchAIResponse(userMessage);
}

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(sender === "user" ? "user-message" : "ai-message");
  messageElement.textContent = message;
  document.getElementById("chatbox").appendChild(messageElement);
  document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}

function fetchAIResponse(userMessage) {
  // Send user input to your Python Flask backend API
  fetch('http://localhost:5000/get-ai-response', {  // Update this URL if you're using a different host/port
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  })
  .then(response => response.json())
  .then(data => {
    const aiMessage = data.response;  // The response object returned from Flask should have 'response' property
    displayMessage(aiMessage, "ai");
  })
  .catch(error => {
    console.error('Error:', error);
    displayMessage("Sorry, something went wrong. Please try again.", "ai");
  });
}
