const path = require('path')
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
     resolve: {
       alias: {
         'bootstrap-components': path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components')
       }
     }
  },

  publicPath: '/carvuecli3',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  lintOnSave: undefined
}
