// express 사용해서 api 호출 링크별로 route 해주게 설정
const express = require('express');

const router = express();
const port = 5000;

router.use('/api/GetIndustry_EFactor_GI', require('./api/sample_GetIndustry_EFactor_GI'));
router.use('/api/GetIndustry_EFactor_TrendAndFactor', require('./api/sample_GetIndustry_EFactor_TrendAndFactor'));
router.use('/api/GetIndustry_EFactor_TrendQuad', require('./api/sample_GetIndustry_EFactor_TrendQuad'));
router.use('/api/GetIndustry_PFactor_GI', require('./api/sample_GetIndustry_PFactor_GI'));
router.use('/api/GetIndustry_PFactor_TrendAndFactor', require('./api/sample_GetIndustry_PFactor_TrendAndFactor'));
router.use('/api/GetIndustry_PFactor_TrendQuad', require('./api/sample_GetIndustry_PFactor_TrendQuad'));
router.use('/api/GetIndustry_Showroom', require('./api/sample_GetIndustry_Showroom'));
router.use('/api/GetIndustry_TotalCategory_List', require('./api/sample_GetIndustry_TotalCategory_List'));
router.use('/api/GetIndustry_EFactor_GI_RelatedWords', require('./api/sample_GetIndustry_EFactor_GI_RelatedWords'));
router.use('/api/GetIndustry_PFactor_GI_RelatedWords', require('./api/sample_GetIndustry_PFactor_GI_RelatedWords'));
router.use('/api/Login', require('./api/sample_Login'));

router.listen(port, function () {
    console.log(`Example app listening on port : ${  port}`);
});

module.exports = router;