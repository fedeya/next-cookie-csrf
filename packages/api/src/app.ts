import cookieParser from 'cookie-parser';
import cors from 'cors';
import csurf from 'csurf';
import express from 'express';
import morgan from 'morgan';
import { PORT } from './config';
import routes from './routes';

const app = express();

// config
app.set('port', PORT);

// middlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(csurf({ cookie: true }));
// routes
app.use('/api', routes);

export default app;
