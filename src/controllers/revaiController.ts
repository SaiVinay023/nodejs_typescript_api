import { Request, Response } from 'express';
import { sendAudioToRevAI, getTranscriptionResult } from '../services/revaiService';

export const uploadAudio = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No audio file uploaded' });

    const jobId = await sendAudioToRevAI(file.path);
    res.status(200).json({ message: 'Audio uploaded', jobId });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error });
  }
};

export const getTranscript = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;
    const transcript = await getTranscriptionResult(jobId);
    res.status(200).json({ transcript });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transcript', details: error });
  }
};
