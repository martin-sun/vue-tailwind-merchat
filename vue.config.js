module.exports = {
  publicPath: '',
  devServer: {
    proxy: {
      '/api/applet/robot': {
        target: 'https://beta.excelle08.cn',
        secure: false,
        changeOrigin: true
      },
      '/api/applet': {
          target: 'https://cndev.woohelps.com',
          secure: false,
          changeOrigin: true
      },
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
      }
    }
  }
}
