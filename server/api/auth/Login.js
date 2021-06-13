const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
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
        //UserId : "testuser", 
        //UserPassword : "1234", 
    }

    //파라미터 테스트
    console.log('======================= body : ', req.body);
    console.log('======================= data : ', req.data);
    console.log('======================= query : ', req.query);
    console.log('======================= params : ', req.params);

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

module.exports = router;