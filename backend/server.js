import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './models/index.js';

import userRoutes from './routes/userRoutes.js';
import businessRoutes from './routes/businessRoutes.js';

const __dirname = path.resolve();
dotenv.config({ path: `${__dirname}/config.env` });

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);

app.get('/', (req, res) => res.json('OnlyJobs API is running...'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});