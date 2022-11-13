const express = require('express');
const router = express.Router();

/**
 * 이미지 리스트 반환
 */
router.get('/images', (request, response, next) => {
    response.json({
        images: [
            '/images/thumbnail/image1.jpg',
            '/images/thumbnail/image2.jpg',
            '/images/thumbnail/image3.jpg',
            '/images/thumbnail/image4.jpg',
            '/images/thumbnail/image5.jpg',
            '/images/thumbnail/image6.jpg',
            '/images/thumbnail/image7.jpg',
            '/images/thumbnail/image8.jpg',
        ],
    });
    //response.end('API IMAGE SERVER');
});

module.exports = router;
