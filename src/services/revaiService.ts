import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const REV_API_BASE = 'https://api.rev.ai/speechtotext/v1';
const REV_API_KEY = process.env.REVAI_API_KEY!;

export const sendAudioToRevAI = async (filePath: string) => {
  const form = new FormData();
  form.append('media', fs.createReadStream(filePath));

  const response = await axios.post(`${REV_API_BASE}/jobs`, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${REV_API_KEY}`
    }
  });

  return response.data.id;
};

export const getTranscriptionResult = async (jobId: string) => {
  const response = await axios.get(`${REV_API_BASE}/jobs/${jobId}/transcript`, {
    headers: { Authorization: `Bearer ${REV_API_KEY}` }
  });

  return response.data;
};
