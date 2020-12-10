module.exports={
    // publicPath: './',
    // outputDir: 'dist',
    // assetsDir: 'static',
    lintOnSave: false,
    // productionSourceMap: false,
    devServer: {
        port: "9030",
        proxy: {
          '/': {
            target: 'http://172.16.37.99:8005',
            changeOrigin: true,
            pathRewrite: {
              '^/': '/'
            }
          }
        }
      },
}