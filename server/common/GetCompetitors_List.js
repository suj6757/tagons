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
  var PROTO_PATH_TEST =  path.join(__dirname,'../proto/CommonService.proto') ;

  var packageDefinition = protoLoader.loadSync(PROTO_PATH_TEST,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

  var protoDescriptor = grpcjs.loadPackageDefinition(packageDefinition);
  var client = new protoDescriptor.CommonService.CommonInfo(serverIpNew, grpcjs.credentials.createInsecure());

  var methodType = req.method;
  var data2 = protoDescriptor.CommonService.Request_Empty ;

  client.GetCompetitors_List(data2, function(err, data) {
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