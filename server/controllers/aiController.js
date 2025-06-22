import { openai } from '../config/openai.js';

const createPrompt = (action, code, targetLang = '') => {
  switch (action) {
    case 'analyze':
      return `You are a code quality reviewer. Analyze the following code and provide feedback on structure, readability, performance, and best practices.\n\n${code}`;
    case 'explain':
      return `Explain the following code in detail as if teaching a beginner:\n\n${code}`;
    case 'translate':
      return `Translate this code to ${targetLang}:\n\n${code}`;
    case 'improve':
      return `Suggest improvements and refactor the following code:\n\n${code}`;
    default:
      return `Just explain this code:\n\n${code}`;
  }
};

const handleAIRequest = async (req, res) => {
  try {
    const { code, action, targetLang } = req.body;

    if (!code || !action) {
      return res.status(400).json({ success: false, message: 'Code and action are required.' });
    }

    const prompt = createPrompt(action, code, targetLang);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful programming assistant.' },
        { role: 'user', content: prompt }
      ]
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ success: true, result });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default handleAIRequest;
