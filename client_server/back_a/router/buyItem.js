const express = require('express');
const router = express.Router();
const axios = require('axios');

// OAuth Server에 포인트 차감 요청
/** hashId, Token 보내주기 */
router.post('/buyItem', async (req, res) => {
    const { hashId, token } = req.body;

    console.log(hashId, token);

    try {
        const response = await axios.post('http://localhost:8000', {
            hashId,
            token,
        });

        console.log(response.data);

        res.json({
            status: true,
            msg: '결제가 성공적으로 처리되었습니다.',
        });
    } catch (e) {
        console.log(e.message);

        res.json({
            status: false,
            msg: '결제에 실패하였습니다 다시 시도하여 주십시오.',
        });
    }
});

module.exports = router;
