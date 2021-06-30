const express = require('express');
const router = express.Router();
/* bodyParser - POST 파라이터 추출에 필요*/ 
var bodyParser = require('body-parser');
/*전통방식의 GET파라미터 분석에 필요*/
var url = require('url');
router.use(bodyParser.json()); // support encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.use('/', (req, res) => {
    console.log('/api/Login');

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');

    var PROTO_PATH_TEST = __dirname  + '/LoginService.proto';
    var packageDefinition_Test = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);
    var client_Test = new protoDescriptor_Test.LoginService.UserInfo('203.245.41.17:50052', grpcjs.credentials.createInsecure());

    var methodType = req.method;
    var data2 = {};
    if( methodType == 'GET' ){
      var parseObj = url.parse(req.url, true);
      data2.UserId = parseObj.query.UserId;
      data2.UserPassword =parseObj.query.UserPassword;
    }
    else{
      data2.UserId = req.body.UserId;
      data2.UserPassword =req.body.UserPassword;
    }

    client_Test.Login(data2, function(err, data) {
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

/*
router.get('/', (req, res) => {
    console.log('http://localhost:5000/api/Login');

    var grpcjs = require('@grpc/grpc-js');
    var protoLoader = require('@grpc/proto-loader');

    var PROTO_PATH_TEST = __dirname  + '/LoginService.proto';
    var packageDefinition_Test = protoLoader.loadSync(PROTO_PATH_TEST,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
    var protoDescriptor_Test = grpcjs.loadPackageDefinition(packageDefinition_Test);
    var client_Test = new protoDescriptor_Test.LoginService.UserInfo('203.245.41.17:50052', grpcjs.credentials.createInsecure());

    // 방식 2
    var data2 = {
        UserId : "testuser", 
        UserPassword : "1234", 
    }

    client_Test.Login(data2, function(err, data) {
        try {
            console.log('error : ', err);
            console.log(data);
            
            res.send(data);
        }
        catch(ex) {
            console.log(ex)
        }
    });
}); */

module.exports = router;