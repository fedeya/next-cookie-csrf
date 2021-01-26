import { ErrorRequestHandler } from 'express';

export const handleError: ErrorRequestHandler = (err, _req, res) => {
  res.json({ message: err.message });
};
