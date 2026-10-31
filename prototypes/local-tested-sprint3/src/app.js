const path = require('node:path');
const express = require('express');
const routes = require('./routes/pages');
const app = express();
app.disable('x-powered-by');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, '..', 'public')));
app.locals.money = (v) => `£${Number(v || 0).toFixed(2)}`;
app.locals.when = (v) => v ? new Date(v).toLocaleString('en-GB') : '—';
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'stockwise' }));
app.use(routes);
app.use((req, res) => res.status(404).render('error', { title: 'Page not found', message: 'This page does not exist.', active: '' }));
app.use((err, req, res, next) => {
  console.error('Request error:', err.message);
  res.status(500).render('error', { title: 'Unable to load data', message: 'Check that MySQL is running and the .env settings are correct.', active: '' });
});
module.exports = app;
