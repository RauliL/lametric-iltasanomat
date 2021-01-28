const express = require('express');
const { format } = require('lametric-rss-formatter');

const FEED_URL = 'https://www.is.fi/rss/tuoreimmat.xml';

const app = express();

module.exports = app;

app.get('/', (req, res) => {
  const { max } = req.query;

  format({ url: FEED_URL, icon: 'iltasnomat', max })
    .then(result => res.send(result))
    .catch(() => res.sendStatus(500));
});
