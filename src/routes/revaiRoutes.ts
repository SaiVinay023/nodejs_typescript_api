import express from 'express';
import multer from 'multer';
import { getTranscript, uploadAudio } from '../controllers/revaiController';
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/transcribe', upload.single('audio'), getTranscript);

export default router;
