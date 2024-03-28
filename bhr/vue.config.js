const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // npm run serve 개발 진행시에 포트가 다르기때문에 프록시 설정
  devServer: {
    proxy: { //서버 프로젝트 포트번호와 동일할 것
      '/api': {  // api로 시작하는 모든 요청을 http://localhost:8000으로 프록시하도록 지정
        target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
   },
  },
 },
});