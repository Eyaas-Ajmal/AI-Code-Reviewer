import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const HF_API_TOKEN = process.env.HF_API_TOKEN;

const huggingfaceClient = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models/bigcode/starcoderbase',
  headers: {
    Authorization: `Bearer ${HF_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default huggingfaceClient;
