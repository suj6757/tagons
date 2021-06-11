const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('TotalCategory_List');

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

    // 방식 1
    var data1 = protoDescriptor_Test.TrendService.Request_Empty

    client_Test.GetIndustry_TotalCategory_List({}, function(err, data) {
        try {
            console.log('error : ', err);
            console.log(data);
            //console.log(data.Datas);
            //console.log(data.Datas[0].Category1);

            res.send(data);
        }
        catch(ex) {
            console.log(ex)
        }
    });
});

module.exports = router;