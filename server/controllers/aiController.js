import huggingfaceClient from '../config/huggingface.js'; // Your HF axios client

const createPrompt = (action, code, targetLang = '') => {
  switch (action) {
    case 'analyze':
      return `Analyze the following code and provide feedback on structure, readability, performance, and best practices.\n\n${code}`;
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

    // Call DeepSeek V3 via HuggingFace Inference API
    const response = await huggingfaceClient.post('', {
      inputs: prompt,
    });

    // HuggingFace usually returns an array of results
    // Adjust this based on actual response shape
    const output = response.data[0]?.generated_text || 'No output from model';

    res.status(200).json({ success: true, result: output });

  } catch (error) {
    console.error('HuggingFace error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default handleAIRequest;
