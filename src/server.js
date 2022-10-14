import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import questionRoutes from './routes/quesstionRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

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

const PORT = process.env.PORT || 4020;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
