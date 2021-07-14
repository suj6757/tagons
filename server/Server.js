// express 사용해서 api 호출 링크별로 route 해주게 설정
const express = require('express');
const router = express();
const port = 5000;

//CommonService.proto /common
router.use('/common/GetChannel_List', require('./common/GetChannel_List'));

//TrendService.proto  /ecommerce
router.use('/ecommerce/GetECommerce_Channel_List', require('./ecommerce/GetECommerce_Channel_List'));
router.use('/ecommerce/GetECommerce_TrendChart', require('./ecommerce/GetECommerce_TrendChart'));
router.use('/ecommerce/GetECommerce_TrendChart_NumOfMerchandise', require('./ecommerce/GetECommerce_TrendChart_NumOfMerchandise'));
router.use('/ecommerce/GetECommerce_TrendChart_AvgOfRatings', require('./ecommerce/GetECommerce_TrendChart_AvgOfRatings'));


//TrendService.proto /industry
router.use('/industry/GetIndustry_EFactor_GI', require('./industry/GetIndustry_EFactor_GI'));
router.use('/industry/GetIndustry_EFactor_TrendAndFactor', require('./industry/GetIndustry_EFactor_TrendAndFactor'));
router.use('/industry/GetIndustry_EFactor_TrendQuad', require('./industry/GetIndustry_EFactor_TrendQuad'));
router.use('/industry/GetIndustry_PFactor_GI', require('./industry/GetIndustry_PFactor_GI'));
router.use('/industry/GetIndustry_PFactor_TrendAndFactor', require('./industry/GetIndustry_PFactor_TrendAndFactor'));
router.use('/industry/GetIndustry_PFactor_TrendQuad', require('./industry/GetIndustry_PFactor_TrendQuad'));
router.use('/industry/GetIndustry_Showroom', require('./industry/GetIndustry_Showroom'));
router.use('/industry/GetIndustry_TotalCategory_List', require('./industry/GetIndustry_TotalCategory_List'));
router.use('/industry/GetIndustry_EFactor_GI_RelatedWords', require('./industry/GetIndustry_EFactor_GI_RelatedWords'));
router.use('/industry/GetIndustry_PFactor_GI_RelatedWords', require('./industry/GetIndustry_PFactor_GI_RelatedWords'));

//TrendService.proto  /social
router.use('/social/GetSocial_Channel_List', require('./social/GetSocial_Channel_List'));
router.use('/social/GetSocial_TrendChart', require('./social/GetSocial_TrendChart'));
router.use('/social/GetSocial_KeywordRank', require('./social/GetSocial_KeywordRank'));
router.use('/social/GetSocial_KeywordChart', require('./social/GetSocial_KeywordChart'));

//LoginService.proto login
router.use('/login/Login', require('./login/Login'));

//OnBroadService.proto :  
router.use('/onbroad/GetBroad_Market', require('./onbroad/GetBroad_Market')); // 상단 꺽은선 그래프
router.use('/onbroad/GetBenefits_Type', require('./onbroad/GetBenefits_Type')); // 가운데 막대 그래프
router.use('/onbroad/GetPrice_Distribution', require('./onbroad/GetPrice_Distribution')); // 하단 꺽은선 그래프

//OnDetailOverviewService.proto : Online Retailor OnDetail Overview
router.use('/ondetailoverview/GetRetailers_Channel_Average', require('./ondetailoverview/GetRetailers_Channel_Average')); // 상단 막대 그래프
router.use('/ondetailoverview/GetRetailers_Crossover_Analysis', require('./ondetailoverview/GetRetailers_Crossover_Analysis')); // 하단 버블차트 및 표

//OnDetailPPIndicatorService.proto
router.use('/ondetailppindicator/GetBrand_Distribution', require('./ondetailppindicator/GetBrand_Distribution')); // P&P Indicator 탭
router.use('/ondetailppindicator/GetBrand_ProductRank', require('./ondetailppindicator/GetBrand_ProductRank')); // P&P Indicator 탭
router.use('/ondetailppindicator/GetCommerce_Indicator', require('./ondetailppindicator/GetCommerce_Indicator')); // Commerce Indicator 탭
router.use('/ondetailppindicator/GetPP_Indicator', require('./ondetailppindicator/GetPP_Indicator')); // P&P Indicator 탭
router.use('/ondetailppindicator/GetPrice_Indicator', require('./ondetailppindicator/GetPrice_Indicator')); //Price Indicator 탭 

//PrimeService.proto
router.use('/prime/GetState_4_Trend_Indicator', require('./prime/GetState_4_Trend_Indicator')); // 
router.use('/prime/GetState_Total_Indicator_Click', require('./prime/GetState_Total_Indicator_Click')); // 
router.use('/prime/GetState_Total_Indicator_SocialBuzz', require('./prime/GetState_Total_Indicator_SocialBuzz')); // 
router.use('/prime/GetState_Total_Indicator_NumofProduct', require('./prime/GetState_Total_Indicator_NumofProduct')); // 
router.use('/prime/GetState_Total_Indicator_NumofConversion', require('./prime/GetState_Total_Indicator_NumofConversion')); // 
router.use('/prime/GetChannel_Posting_Indicator', require('./prime/GetChannel_Posting_Indicator')); // 

// SocialListeningService.proto
router.use('/sociallistening/GetChannel_Sentiment_Analysis', require('./sociallistening/GetChannel_Sentiment_Analysis'));
router.use('/sociallistening/GetNeeds_Pattern_Init', require('./sociallistening/GetNeeds_Pattern_Init'));
router.use('/sociallistening/GetNeeds_Pattern_Selected', require('./sociallistening/GetNeeds_Pattern_Selected'));
router.use('/sociallistening/GetSentiment_Analysis', require('./sociallistening/GetSentiment_Analysis'));
router.use('/sociallistening/GetSentiment_Factor', require('./sociallistening/GetSentiment_Factor'));

// TrendGAService.proto
router.use('/trendga/GetGA_Keyword_GAP', require('./trendga/GetGA_Keyword_GAP'));
router.use('/trendga/GetGA_Social_Comparison', require('./trendga/GetGA_Social_Comparison'));
router.use('/trendga/GetGA_Board_Trend', require('./trendga/GetGA_Board_Trend'));
router.use('/trendga/GetGA_Demographics_Analysis', require('./trendga/GetGA_Demographics_Analysis'));
router.use('/trendga/GetGA_User_Indicators_Line', require('./trendga/GetGA_User_Indicators_Line'));
router.use('/trendga/GetGA_User_Indicators_Bar', require('./trendga/GetGA_User_Indicators_Bar'));

// TrendOverviewService.proto
router.use('/trendoverview/GetBasic_Overview_Total', require('./trendoverview/GetBasic_Overview_Total'));
router.use('/trendoverview/GetBasic_Overview_ID_Rate', require('./trendoverview/GetBasic_Overview_ID_Rate'));
router.use('/trendoverview/GetBasic_Overview_Gap1', require('./trendoverview/GetBasic_Overview_Gap1'));
router.use('/trendoverview/GetBasic_Overview_Gap2', require('./trendoverview/GetBasic_Overview_Gap2'));

//TrendResponseService.proto
router.use('/trendresponse/GetTrend_Response_Init_Info', require('./trendresponse/GetTrend_Response_Init_Info'));
router.use('/trendresponse/GetTrend_Response_Selected_Info', require('./trendresponse/GetTrend_Response_Selected_Info'));

router.listen(port, function () {
    console.log(`Example app listening on port : ${  port}`);
});

module.exports = router;