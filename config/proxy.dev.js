const baseUrl = 'http://192.168.2.76:9089'
module.exports = {
  '/demo': {
    target: baseUrl,
    changeOrigin: true
  },
  '/token': {
    target: baseUrl,
    changeOrigin: true
  },
  '/accessoryfile': {
    target: baseUrl,
    changeOrigin: true
  },
}
