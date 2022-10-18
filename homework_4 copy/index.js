const express = require('express');
const app = express();
const logger = require('morgan');
const cohorts_route = require('./routes/cohorts');

const PORT = 3000;
const LOCALHOST = 'localhost';

/* Logging software */
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const methodOverride = require('method-override');

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

/* View Engine */
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.send('Hello from the the other side 👾');
});

/* Router */
app.use('/cohorts', cohorts_route);

app.listen(PORT, LOCALHOST, (err) => {
  if (err) {
    console.log(`Error`, err);
  } else {
    console.log(`Listening on ${PORT}:${LOCALHOST}`);
  }
});
