const express = require('express');
const path = require('path');
const imageThumbnail = require('image-thumbnail');
const router = express.Router();

/**
 * 이미지 썸네일 처리
 */
router.get('/thumbnail/:file', async (request, response, next) => {
    const { params, query } = request;
    const { file } = params || {};
    const { width = 0, height = 0 } = query || {};

    try {
        const options = { width: Number(width), height: Number(height) };
        const thumbnail = await imageThumbnail(path.join(__dirname, `../public/images/${file}`), options);
        response.end(thumbnail);
    }catch(error) {
        response.end(error?.message);
    }
});

module.exports = router;
