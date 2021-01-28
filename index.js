const express = require('express');
const { format } = require('lametric-rss-formatter');

const feeds = require('./feeds.json');

const app = express();

module.exports = app;

app.get('/', (req, res) => {
  const { feed, max } = req.query;
  const url = feeds[feed || 'Tuoreimmat uutisotsikot'];

  if (!url) {
    res.send({
      frames: [{
        text: 'Invalid feed',
        icon: 'stop'
      }]
    });
    return;
  }

  format({ url, max, icon: 'iltasnomat' })
    .then(result => res.send(result))
    .catch(() => res.sendStatus(500));
});
