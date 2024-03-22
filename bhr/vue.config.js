const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: ["all"],
    port: 3000
  },
  transpileDependencies: true
})
