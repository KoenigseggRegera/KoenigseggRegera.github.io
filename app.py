from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/get-ai-response', methods=['POST'])
def get_ai_response():
    user_message = request.json.get('message')
    
    # Get response from OpenAI API
    response = openai.Completion.create(
        model="gpt-4",  # Use the GPT model you prefer
        prompt=user_message,
        max_tokens=150
    )

    return jsonify({"response": response.choices[0].text.strip()})

if __name__ == '__main__':
    app.run(debug=True)
