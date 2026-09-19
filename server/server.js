import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import checkRouter from './routes/check.js';

const app = express();
const PORT = process.env.PORT || 5000;
const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: origin === '*' ? true : origin }));
app.use(express.json({ limit: '12mb' }));
app.get('/api/health', (_, res) => res.json({ ok: true, service: 'sachcheck-server' }));
app.use('/api/check', checkRouter);
app.use((_, res) => res.status(404).json({ error: 'Route not found' }));
app.listen(PORT, () => console.log(`SachCheck server running on http://localhost:${PORT}`));
