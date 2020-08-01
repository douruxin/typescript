// Vue.config.js
module.exports = {
  devServer: {
    proxy: {
      'api': {
        target: 'http://47.96.0.211:9000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
