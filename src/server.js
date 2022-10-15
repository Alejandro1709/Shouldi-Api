import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import questionRoutes from './routes/quesstionRoutes.js';
import cors from 'cors';
import { notFound, globalError } from './controllers/errorController.js';
import { connectDb } from './db/index.js';

dotenv.config();

const app = express();

const uri =
  process.env.NODE_ENV === 'development'
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;

connectDb(uri);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/questions', questionRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

// ERROR HANDLING

app.all('*', notFound);

app.use(globalError);

const PORT = process.env.PORT || 4020;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
