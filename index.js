// Timestamp Microservice - freeCodeCamp Back End Development and APIs
const express = require('express');
const cors = require('cors');

const app = express();

// enable CORS so freeCodeCamp can test the API remotely
app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/', (req, res) => {
  res.send('<h1>Timestamp Microservice</h1>' +
    '<p>Example: <a href="/api/2015-12-25">/api/2015-12-25</a></p>' +
    '<p>Example: <a href="/api/1451001600000">/api/1451001600000</a></p>');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// GET /api/:date? -> { unix, utc } or { error: 'Invalid Date' }
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let d;

  if (!date) {
    d = new Date(); // no date -> current time
  } else if (/^-?\d+$/.test(date)) {
    d = new Date(Number(date)); // all digits -> Unix milliseconds
  } else {
    d = new Date(date); // any other date string
  }

  if (isNaN(d.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
