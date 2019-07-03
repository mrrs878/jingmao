module.exports = {
  devServer: {
    port: 8081,
    host: 'localhost',
    https: false,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8086',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
