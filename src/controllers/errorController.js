import AppError from '../utils/AppError.js';

export const notFound = (req, res, next) => {
  next(new AppError('This route does not exists!', 404));
};

export const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
