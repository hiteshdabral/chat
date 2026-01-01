const express = require('express');
const { authRoutesV1 } = require('./authRoutes');

const router = (app) => {
  const v1Routes = express.Router();

  v1Routes.use('/auth', authRoutesV1);

  app.use('/api', v1Routes);

  v1Routes.use((req, res, next) => {
    if (!req.route) {
      const error = new Error('No route matched');
      error.status = 404;
      next(error);
    }
    next();
  });
};
module.exports = router;
