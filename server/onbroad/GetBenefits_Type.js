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
    var PROTO_PATH_TEST = path.join(__dirname,'../proto/OnBroadService.proto') ;

    var packageDefinition = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    var protoDescriptor = grpcjs.loadPackageDefinition(packageDefinition);
    var client = new protoDescriptor.OnBroadService.OnBroadServiceInfo(serverIpNew, grpcjs.credentials.createInsecure());

    var methodType = req.method;
    var data2 = {};
    if( methodType == 'GET' ){
      var parseObj = url.parse(req.url, true);
      data2.FromDate = parseObj.query.FromDate;
      data2.ToDate = parseObj.query.ToDate;
      data2.Period_Unit = parseObj.query.Period_Unit;
      data2.Competitors = parseObj.query.Competitors;
      data2.Keyword = parseObj.query.Keyword;
      data2.Tab_Selected = parseObj.query.Tab_Selected;
    }
    else{
      data2.FromDate = req.body.FromDate;
      data2.ToDate = req.body.ToDate;
      data2.Period_Unit = req.body.Period_Unit;
      data2.Competitors = req.body.Competitors;
      data2.Keyword = req.body.Keyword;
      data2.Tab_Selected = req.body.Tab_Selected;
    }
    console.log(data2);
    client.GetBenefits_Type(data2, function(err, data) {
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