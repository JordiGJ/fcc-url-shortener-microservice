require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// middelware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// urlshortener
// post urls are saved here
const urls = [];

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  // check url
  const validUrl = /^(http|https):\/\/[^ "]+$/.test(url);
  if (!validUrl) {
    return res.json({ error: 'invalid url' });
  }

  if (urls.includes(url)) {
    const index = urls.indexOf(url);
    return res.json({ original_url: url, short_url: index });
  } else {
    urls.push(url);
    const index = urls.indexOf(url);
    return res.json({ original_url: url, short_url: index });
  }
});

app.get('/api/shorturl/:index', (req, res) => {
  const index = req.params.index;
  const url = urls[index];
  res.redirect(url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

/*
https://fcc-project-urlshortener.jordigj.repl.co/
*/
