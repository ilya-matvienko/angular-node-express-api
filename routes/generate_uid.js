const express = require('express');
const uid = require('uid-safe');

const router = express.Router();

// Получить guid.
router.get('/', function(req, res, next) {
    const strUid = uid.sync(18);
    res.json({guid: strUid});
});

module.exports = router;
