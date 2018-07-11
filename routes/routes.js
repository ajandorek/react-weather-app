const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ secretMessage: 'Hello there!' });
});

module.exports = router;
