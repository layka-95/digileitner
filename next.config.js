const withPWA = require('next-pwa')
 
module.exports = withPWA({
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/app',
  sw: 'service-worker.js',
})

module.exports = {
  env: {
    serverUrl: 'https://leitnersys.ir',
  },
}