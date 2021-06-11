const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GetIndustry_PFactor_TrendQuad');

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');

    var PROTO_PATH_TEST = __dirname  + '/TrendService.proto';
    var packageDefinition_Test = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);
    var client_Test = new protoDescriptor_Test.TrendService.TrendInfo('203.245.41.17:50052', grpcjs.credentials.createInsecure());

    // 방식 2
    var data2 = {
        FromDate : "20210521", 
        ToDate : "20210523", 
        Category1 : "패션의류",
        Category2 : "남성언더웨어/잠옷",
        Category3 : "보정속옷",
        Keyword : ""
    }

    client_Test.GetIndustry_PFactor_TrendQuad(data2, function(err, data) {
        try {
            console.log('error : ', err);
            console.log(data);
            console.log(data.Message)
            console.log(data.Data[0]['Category_upper'])

            res.send(data);
        }
        catch(ex) {
            console.log(ex)
        }
    });
});

module.exports = router;