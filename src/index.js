import express from 'express';
import { matchRouter } from '../src/routes/matches.js';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Sports API!' });
});

app.use('/matches', matchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
