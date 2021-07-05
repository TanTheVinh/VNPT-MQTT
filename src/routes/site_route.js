const express = require('express');
const router = express.Router();
const site_controller = require('../app/controllers/site_controller');

router.use('/search', site_controller.search);
router.use('/', site_controller.index);

module.exports = router;