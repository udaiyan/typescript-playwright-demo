import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Backend is running. Visit <a href="/api/items">/api/items</a> for data.');
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});