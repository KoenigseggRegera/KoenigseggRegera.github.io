const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: 'sk-...338A',
});

app.use(bodyParser.json());

app.post('/get-ai-response', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: userMessage },
      ],
    });
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: 'An error occurred. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
