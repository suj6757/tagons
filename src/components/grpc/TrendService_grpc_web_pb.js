/**
 * @fileoverview gRPC-Web generated client stub for TrendService
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.TrendService = require('./TrendService_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.TrendService.TrendInfoClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.TrendService.TrendInfoPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Empty,
 *   !proto.TrendService.Response_TotalCategory_List>}
 */
const methodDescriptor_TrendInfo_GetIndustry_TotalCategory_List = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_TotalCategory_List',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Empty,
  proto.TrendService.Response_TotalCategory_List,
  /**
   * @param {!proto.TrendService.Request_Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_TotalCategory_List.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Empty,
 *   !proto.TrendService.Response_TotalCategory_List>}
 */
const methodInfo_TrendInfo_GetIndustry_TotalCategory_List = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_TotalCategory_List,
  /**
   * @param {!proto.TrendService.Request_Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_TotalCategory_List.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_TotalCategory_List)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_TotalCategory_List>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_TotalCategory_List =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_TotalCategory_List',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_TotalCategory_List,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_TotalCategory_List>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_TotalCategory_List =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_TotalCategory_List',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_TotalCategory_List);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_Showroom>}
 */
const methodDescriptor_TrendInfo_GetIndustry_Showroom = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_Showroom',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type1,
  proto.TrendService.Response_Showroom,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_Showroom.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_Showroom>}
 */
const methodInfo_TrendInfo_GetIndustry_Showroom = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_Showroom,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_Showroom.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_Showroom)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_Showroom>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_Showroom =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_Showroom',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_Showroom,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_Showroom>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_Showroom =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_Showroom',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_Showroom);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_XY_Type1>}
 */
const methodDescriptor_TrendInfo_GetIndustry_PFactor_TrendQuad = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_PFactor_TrendQuad',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type1,
  proto.TrendService.Response_XY_Type1,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_XY_Type1.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_XY_Type1>}
 */
const methodInfo_TrendInfo_GetIndustry_PFactor_TrendQuad = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_XY_Type1,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_XY_Type1.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_XY_Type1)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_XY_Type1>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_PFactor_TrendQuad =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_PFactor_TrendQuad',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_PFactor_TrendQuad,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_XY_Type1>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_PFactor_TrendQuad =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_PFactor_TrendQuad',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_PFactor_TrendQuad);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type2,
 *   !proto.TrendService.Response_PTrendAndFactor>}
 */
const methodDescriptor_TrendInfo_GetIndustry_PFactor_TrendAndFactor = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_PFactor_TrendAndFactor',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type2,
  proto.TrendService.Response_PTrendAndFactor,
  /**
   * @param {!proto.TrendService.Request_Type2} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_PTrendAndFactor.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type2,
 *   !proto.TrendService.Response_PTrendAndFactor>}
 */
const methodInfo_TrendInfo_GetIndustry_PFactor_TrendAndFactor = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_PTrendAndFactor,
  /**
   * @param {!proto.TrendService.Request_Type2} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_PTrendAndFactor.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type2} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_PTrendAndFactor)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_PTrendAndFactor>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_PFactor_TrendAndFactor =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_PFactor_TrendAndFactor',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_PFactor_TrendAndFactor,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type2} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_PTrendAndFactor>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_PFactor_TrendAndFactor =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_PFactor_TrendAndFactor',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_PFactor_TrendAndFactor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_XY_Type1>}
 */
const methodDescriptor_TrendInfo_GetIndustry_EFactor_TrendQuad = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_EFactor_TrendQuad',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type1,
  proto.TrendService.Response_XY_Type1,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_XY_Type1.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_XY_Type1>}
 */
const methodInfo_TrendInfo_GetIndustry_EFactor_TrendQuad = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_XY_Type1,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_XY_Type1.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_XY_Type1)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_XY_Type1>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_EFactor_TrendQuad =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_EFactor_TrendQuad',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_EFactor_TrendQuad,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_XY_Type1>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_EFactor_TrendQuad =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_EFactor_TrendQuad',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_EFactor_TrendQuad);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type2,
 *   !proto.TrendService.Response_ETrendAndFactor>}
 */
const methodDescriptor_TrendInfo_GetIndustry_EFactor_TrendAndFactor = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_EFactor_TrendAndFactor',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type2,
  proto.TrendService.Response_ETrendAndFactor,
  /**
   * @param {!proto.TrendService.Request_Type2} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_ETrendAndFactor.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type2,
 *   !proto.TrendService.Response_ETrendAndFactor>}
 */
const methodInfo_TrendInfo_GetIndustry_EFactor_TrendAndFactor = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_ETrendAndFactor,
  /**
   * @param {!proto.TrendService.Request_Type2} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_ETrendAndFactor.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type2} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_ETrendAndFactor)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_ETrendAndFactor>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_EFactor_TrendAndFactor =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_EFactor_TrendAndFactor',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_EFactor_TrendAndFactor,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type2} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_ETrendAndFactor>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_EFactor_TrendAndFactor =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_EFactor_TrendAndFactor',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_EFactor_TrendAndFactor);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_GI>}
 */
const methodDescriptor_TrendInfo_GetIndustry_PFactor_GI = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_PFactor_GI',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type1,
  proto.TrendService.Response_GI,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_GI.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_GI>}
 */
const methodInfo_TrendInfo_GetIndustry_PFactor_GI = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_GI,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_GI.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_GI)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_GI>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_PFactor_GI =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_PFactor_GI',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_PFactor_GI,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_GI>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_PFactor_GI =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_PFactor_GI',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_PFactor_GI);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_GI>}
 */
const methodDescriptor_TrendInfo_GetIndustry_EFactor_GI = new grpc.web.MethodDescriptor(
  '/TrendService.TrendInfo/GetIndustry_EFactor_GI',
  grpc.web.MethodType.UNARY,
  proto.TrendService.Request_Type1,
  proto.TrendService.Response_GI,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_GI.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.TrendService.Request_Type1,
 *   !proto.TrendService.Response_GI>}
 */
const methodInfo_TrendInfo_GetIndustry_EFactor_GI = new grpc.web.AbstractClientBase.MethodInfo(
  proto.TrendService.Response_GI,
  /**
   * @param {!proto.TrendService.Request_Type1} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TrendService.Response_GI.deserializeBinary
);


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.TrendService.Response_GI)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TrendService.Response_GI>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TrendService.TrendInfoClient.prototype.getIndustry_EFactor_GI =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_EFactor_GI',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_EFactor_GI,
      callback);
};


/**
 * @param {!proto.TrendService.Request_Type1} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TrendService.Response_GI>}
 *     Promise that resolves to the response
 */
proto.TrendService.TrendInfoPromiseClient.prototype.getIndustry_EFactor_GI =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TrendService.TrendInfo/GetIndustry_EFactor_GI',
      request,
      metadata || {},
      methodDescriptor_TrendInfo_GetIndustry_EFactor_GI);
};


module.exports = proto.TrendService;

