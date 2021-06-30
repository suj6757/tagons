// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var TrendService_pb = require('./TrendService_pb.js');

function serialize_TrendService_Request_Empty(arg) {
  if (!(arg instanceof TrendService_pb.Request_Empty)) {
    throw new Error('Expected argument of type TrendService.Request_Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Request_Empty(buffer_arg) {
  return TrendService_pb.Request_Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Request_Type1(arg) {
  if (!(arg instanceof TrendService_pb.Request_Type1)) {
    throw new Error('Expected argument of type TrendService.Request_Type1');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Request_Type1(buffer_arg) {
  return TrendService_pb.Request_Type1.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Request_Type2(arg) {
  if (!(arg instanceof TrendService_pb.Request_Type2)) {
    throw new Error('Expected argument of type TrendService.Request_Type2');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Request_Type2(buffer_arg) {
  return TrendService_pb.Request_Type2.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Response_ETrendAndFactor(arg) {
  if (!(arg instanceof TrendService_pb.Response_ETrendAndFactor)) {
    throw new Error('Expected argument of type TrendService.Response_ETrendAndFactor');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Response_ETrendAndFactor(buffer_arg) {
  return TrendService_pb.Response_ETrendAndFactor.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Response_GI(arg) {
  if (!(arg instanceof TrendService_pb.Response_GI)) {
    throw new Error('Expected argument of type TrendService.Response_GI');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Response_GI(buffer_arg) {
  return TrendService_pb.Response_GI.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Response_PTrendAndFactor(arg) {
  if (!(arg instanceof TrendService_pb.Response_PTrendAndFactor)) {
    throw new Error('Expected argument of type TrendService.Response_PTrendAndFactor');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Response_PTrendAndFactor(buffer_arg) {
  return TrendService_pb.Response_PTrendAndFactor.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Response_Showroom(arg) {
  if (!(arg instanceof TrendService_pb.Response_Showroom)) {
    throw new Error('Expected argument of type TrendService.Response_Showroom');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Response_Showroom(buffer_arg) {
  return TrendService_pb.Response_Showroom.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Response_TotalCategory_List(arg) {
  if (!(arg instanceof TrendService_pb.Response_TotalCategory_List)) {
    throw new Error('Expected argument of type TrendService.Response_TotalCategory_List');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Response_TotalCategory_List(buffer_arg) {
  return TrendService_pb.Response_TotalCategory_List.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TrendService_Response_XY_Type1(arg) {
  if (!(arg instanceof TrendService_pb.Response_XY_Type1)) {
    throw new Error('Expected argument of type TrendService.Response_XY_Type1');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TrendService_Response_XY_Type1(buffer_arg) {
  return TrendService_pb.Response_XY_Type1.deserializeBinary(new Uint8Array(buffer_arg));
}


var TrendInfoService = exports.TrendInfoService = {
  getIndustry_TotalCategory_List: {
    path: '/TrendService.TrendInfo/GetIndustry_TotalCategory_List',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Empty,
    responseType: TrendService_pb.Response_TotalCategory_List,
    requestSerialize: serialize_TrendService_Request_Empty,
    requestDeserialize: deserialize_TrendService_Request_Empty,
    responseSerialize: serialize_TrendService_Response_TotalCategory_List,
    responseDeserialize: deserialize_TrendService_Response_TotalCategory_List,
  },
  getIndustry_Showroom: {
    path: '/TrendService.TrendInfo/GetIndustry_Showroom',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type1,
    responseType: TrendService_pb.Response_Showroom,
    requestSerialize: serialize_TrendService_Request_Type1,
    requestDeserialize: deserialize_TrendService_Request_Type1,
    responseSerialize: serialize_TrendService_Response_Showroom,
    responseDeserialize: deserialize_TrendService_Response_Showroom,
  },
  getIndustry_PFactor_TrendQuad: {
    path: '/TrendService.TrendInfo/GetIndustry_PFactor_TrendQuad',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type1,
    responseType: TrendService_pb.Response_XY_Type1,
    requestSerialize: serialize_TrendService_Request_Type1,
    requestDeserialize: deserialize_TrendService_Request_Type1,
    responseSerialize: serialize_TrendService_Response_XY_Type1,
    responseDeserialize: deserialize_TrendService_Response_XY_Type1,
  },
  getIndustry_PFactor_TrendAndFactor: {
    path: '/TrendService.TrendInfo/GetIndustry_PFactor_TrendAndFactor',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type2,
    responseType: TrendService_pb.Response_PTrendAndFactor,
    requestSerialize: serialize_TrendService_Request_Type2,
    requestDeserialize: deserialize_TrendService_Request_Type2,
    responseSerialize: serialize_TrendService_Response_PTrendAndFactor,
    responseDeserialize: deserialize_TrendService_Response_PTrendAndFactor,
  },
  getIndustry_EFactor_TrendQuad: {
    path: '/TrendService.TrendInfo/GetIndustry_EFactor_TrendQuad',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type1,
    responseType: TrendService_pb.Response_XY_Type1,
    requestSerialize: serialize_TrendService_Request_Type1,
    requestDeserialize: deserialize_TrendService_Request_Type1,
    responseSerialize: serialize_TrendService_Response_XY_Type1,
    responseDeserialize: deserialize_TrendService_Response_XY_Type1,
  },
  getIndustry_EFactor_TrendAndFactor: {
    path: '/TrendService.TrendInfo/GetIndustry_EFactor_TrendAndFactor',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type2,
    responseType: TrendService_pb.Response_ETrendAndFactor,
    requestSerialize: serialize_TrendService_Request_Type2,
    requestDeserialize: deserialize_TrendService_Request_Type2,
    responseSerialize: serialize_TrendService_Response_ETrendAndFactor,
    responseDeserialize: deserialize_TrendService_Response_ETrendAndFactor,
  },
  getIndustry_PFactor_GI: {
    path: '/TrendService.TrendInfo/GetIndustry_PFactor_GI',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type1,
    responseType: TrendService_pb.Response_GI,
    requestSerialize: serialize_TrendService_Request_Type1,
    requestDeserialize: deserialize_TrendService_Request_Type1,
    responseSerialize: serialize_TrendService_Response_GI,
    responseDeserialize: deserialize_TrendService_Response_GI,
  },
  getIndustry_EFactor_GI: {
    path: '/TrendService.TrendInfo/GetIndustry_EFactor_GI',
    requestStream: false,
    responseStream: false,
    requestType: TrendService_pb.Request_Type1,
    responseType: TrendService_pb.Response_GI,
    requestSerialize: serialize_TrendService_Request_Type1,
    requestDeserialize: deserialize_TrendService_Request_Type1,
    responseSerialize: serialize_TrendService_Response_GI,
    responseDeserialize: deserialize_TrendService_Response_GI,
  },
};

exports.TrendInfoClient = grpc.makeGenericClientConstructor(TrendInfoService);
