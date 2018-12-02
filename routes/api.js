const express = require('express'),
    router = express.Router(),
    wmicController = require('../controllers/wmicController');

/**
 * Host logical disks info
 */
router.post('/disks', wmicController.disks);

/**
 * Host system info
 */
router.post('/system', wmicController.system);

module.exports = router;
