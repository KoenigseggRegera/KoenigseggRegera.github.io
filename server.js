const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Replace this with your OpenAI API key
const OPENAI_API_KEY = 'sk-...338A';

// POST endpoint for chat messages
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',  // You can use a different model like gpt-3.5-turbo or gpt-4
        prompt: userMessage,
        max_tokens: 150,
        temperature: 0.7,  // Controls randomness
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].text.trim();
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Error from OpenAI API:', error);
    res.status(500).json({ error: 'Error with AI response' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
