const router = require('express').Router();

const create = require('../operations/weather/create');
const getAll = require('../operations/weather/getAll');
const getRecent = require('../operations/weather/getRecent');

router.get('/api/weather', getAll);
router.post('/api/weather', create);

// Returns most recent entry
router.get('/api/weather/new', getRecent);

module.exports = router;
