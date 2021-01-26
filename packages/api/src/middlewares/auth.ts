import jwt from 'express-jwt';
import { SECRET_TOKEN } from '../config';

const auth = () =>
  jwt({
    algorithms: ['HS256'],
    secret: SECRET_TOKEN,
    getToken(req) {
      if (req.cookies.token) return req.cookies.token;

      return req.headers.authorization?.split(' ')[1];
    }
  });

export default auth;
