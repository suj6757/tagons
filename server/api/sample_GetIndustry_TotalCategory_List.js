const express = require('express');

const router = express.Router();

/* bodyParser - POST 파라이터 추출에 필요*/ 
var bodyParser = require('body-parser');
/*전통방식의 GET파라미터 분석에 필요*/
var url = require('url');

router.use(bodyParser.json()); // support encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use('/', (req, res) => {
    console.log('http://localhost:5000/api/TotalCategory_List');

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');

    var PROTO_PATH_TEST = `${__dirname   }/TrendService.proto`;
    var serverIpOld = '203.245.41.17:50052';
    var serverIpNew = '211.206.127.139:50052';
    var packageDefinition_Test = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);
    var client_Test = new protoDescriptor_Test.TrendService.TrendInfo(serverIpNew, grpcjs.credentials.createInsecure());
    var methodType = req.method;
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