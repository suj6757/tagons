const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use( '/common' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/ecommerce' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/industry' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/social' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/login' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/onbroad' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/ondetailoverview' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/ondetailppindicator' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/prime' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/sociallistening' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/trendga' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/trendoverview' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
    app.use( '/trendresponse' ,
              createProxyMiddleware({
                target: 'http://localhost:5000',
                changeOrigin: true,
                headers: {
                  "Connection" : "keep-alive"}}));
};