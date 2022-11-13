const express = require('express');
const router = express.Router();

/**
 * index 웹 페이지
 */
router.get('/', (request, response, next) => {
    response.render('index', { title: 'Simple Photo Viewer' });
});

module.exports = router;
