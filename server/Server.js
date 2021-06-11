const express = require('express');
const router = express();

const port = 5000;

// 대표 url에 의해 각각의 router로 분기
router.use('/auth', require('./routes/AuthRouter'));
router.use('/getIndustry', require('./routes/GetIndustryRouter'));

router.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});

module.exports = router;
