const express = require('express');
const router = express.Router();

router.use('/EFactor_GI', require('../api/getIndustry/EFactor_GI'));
router.use('/EFactor_TrendAndFactor', require('../api/getIndustry/EFactor_TrendAndFactor'));
router.use('/EFactor_TrendQuad', require('../api/getIndustry/EFactor_TrendQuad'));
router.use('/PFactor_GI', require('../api/getIndustry/PFactor_GI'));
router.use('/PFactor_TrendAndFactor', require('../api/getIndustry/PFactor_TrendAndFactor'));
router.use('/PFactor_TrendQuad', require('../api/getIndustry/PFactor_TrendQuad'));
router.use('/Showroom', require('../api/getIndustry/Showroom'));
router.use('/TotalCategory_List', require('../api/getIndustry/TotalCategory_List'));

module.exports = router;