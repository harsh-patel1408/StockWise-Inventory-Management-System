require('dotenv').config();
const express = require('express');
const path = require('path');
const pages = require('./routes/pages');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  next();
});
app.use('/', pages);
app.use((req, res) => res.status(404).render('error', {
  title: 'Page not found', message: 'This page does not exist.', status: 404
}));
app.use((err, req, res, next) => {
  console.error('[StockWise]', err.message);
  if (res.headersSent) return next(err);
  const isDatabaseError = Boolean(err.code && (/^(ER_|ECONN|ETIMEDOUT|PROTOCOL_)/.test(err.code)));
  res.status(isDatabaseError ? 503 : 500).render('error', {
    title: isDatabaseError ? 'Database unavailable' : 'Unexpected error',
    message: isDatabaseError
      ? 'Check that MySQL is running, the schema and seed were imported, and .env is configured.'
      : 'An unexpected error occurred. Check the server console.',
    status: isDatabaseError ? 503 : 500
  });
});

if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log('StockWise: http://localhost:' + port));
}
module.exports = app;
