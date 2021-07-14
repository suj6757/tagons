const express = require('express');
const router = express.Router();
/* bodyParser - POST 파라이터 추출에 필요*/ 
var bodyParser = require('body-parser');
/*전통방식의 GET파라미터 분석에 필요*/
var url = require('url');
router.use(bodyParser.json()); // support encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use('/', (req, res) => {

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');
    var serverIpOld = '203.245.41.17:50052';
    var serverIpNew = '211.206.127.139:50052';
    var path =  require("path");
    var PROTO_PATH_TEST = path.join(__dirname,'../proto/TrendGAService.proto') ;

    var packageDefinition = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    var protoDescriptor = grpcjs.loadPackageDefinition(packageDefinition);
    var client = new protoDescriptor.TrendGAService.TrendGAInfo(serverIpNew, grpcjs.credentials.createInsecure());

    var methodType = req.method;
    var data2 = {};

    if( methodType == 'GET' ){
      var parseObj = url.parse(req.url, true);
      data2.Period_Unit = parseObj.query.Period_Unit;
      data2.Company = parseObj.query.Company;
      data2.CompanyCode = parseObj.query.CompanyCode;
      data2.Keyword = parseObj.query.Keyword;
      data2.Internal_Index = parseObj.query.Internal_Index;
      data2.External_Index = parseObj.query.External_Index;
      data2.Select_Legend = parseObj.query.Select_Legend;
    }
    else{
      data2.Period_Unit = req.body.Period_Unit;
      data2.Company = req.body.Company;
      data2.CompanyCode = req.body.CompanyCode;
      data2.Keyword = req.body.Keyword;
      data2.Internal_Index = req.body.Internal_Index;
      data2.External_Index = req.body.External_Index;
      data2.Select_Legend = req.body.Select_Legend;
    }
    console.log(data2);
    client.GetGA_Demographics_Analysis(data2, function(err, data) {
        try {
            console.log('error : ', err);
            console.log(data);
            res.send(data);
        }
        catch(ex) {
            console.log(ex)
        }
    });


});

module.exports = router;