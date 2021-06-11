/**
 * @fileoverview gRPC-Web generated client stub for LoginService
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.LoginService = require('./LoginService_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.LoginService.UserInfoClient =
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
proto.LoginService.UserInfoPromiseClient =
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
 *   !proto.LoginService.Request_UserInfo,
 *   !proto.LoginService.Response_LoginUserInfo>}
 */
const methodDescriptor_UserInfo_Login = new grpc.web.MethodDescriptor(
  '/LoginService.UserInfo/Login',
  grpc.web.MethodType.UNARY,
  proto.LoginService.Request_UserInfo,
  proto.LoginService.Response_LoginUserInfo,
  /**
   * @param {!proto.LoginService.Request_UserInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.LoginService.Response_LoginUserInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.LoginService.Request_UserInfo,
 *   !proto.LoginService.Response_LoginUserInfo>}
 */
const methodInfo_UserInfo_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.LoginService.Response_LoginUserInfo,
  /**
   * @param {!proto.LoginService.Request_UserInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.LoginService.Response_LoginUserInfo.deserializeBinary
);


/**
 * @param {!proto.LoginService.Request_UserInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.LoginService.Response_LoginUserInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.LoginService.Response_LoginUserInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.LoginService.UserInfoClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/LoginService.UserInfo/Login',
      request,
      metadata || {},
      methodDescriptor_UserInfo_Login,
      callback);
};


/**
 * @param {!proto.LoginService.Request_UserInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.LoginService.Response_LoginUserInfo>}
 *     Promise that resolves to the response
 */
proto.LoginService.UserInfoPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/LoginService.UserInfo/Login',
      request,
      metadata || {},
      methodDescriptor_UserInfo_Login);
};


module.exports = proto.LoginService;

