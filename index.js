const express = require('express');
const parser = require('parse-rss');

const FEED_URL = 'https://www.is.fi/rss/tuoreimmat.xml';

const app = express();

module.exports = app;

app.get('/', (req, res) => {
  const { max } = req.query;

  // Attempt to retrieve and parse the RSS feed.
  parser(FEED_URL, (err, rss) => {
    // Was it unsuccessful?
    if (err) {
      res.send({
        frames: [{
          text: 'Unable to retrieve RSS feed',
          icon: 'stop'
        }]
      })
      return;
    }

    // Success! Let's process the feed now.
    res.send({
      frames: rss
        // Sort entries based on "pubDate" field.
        .sort((entry1, entry2) => {
          const time1 = (new Date(entry1.pubDate)).getTime();
          const time2 = (new Date(entry2.pubDate)).getTime();

          return time1 > time2 ? -1 : time1 < time2 ? 1 : 0;
        })
        // Display only 5 or user defined amount of latest entries. However do
        // not allow more than 20 entries.
        .splice(0, Math.min(max ? parseInt(max, 10) : 5, 20))
        // And convert them into LaMetric format.
        .map((entry, index) => ({
          index,
          text: `${index + 1}. ${entry.title}`,
          icon: 'ilta-sanomat'
        }))
    });
  });
});
