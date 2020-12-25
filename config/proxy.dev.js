const gateway = 'http://192.168.2.23:9089'

// const gateway = 'https://dev.zgjdy.net/bhzs/'

// const gateway = 'https://qa.zgjdy.net/hhzs/'

// const gateway = 'https://qa.zgjdy.net/bhzs/'

// const gateway = 'https://qa.zgjdy.net/jdyh/'

// const gateway = 'http://www.zgjdy.net/bhzs/'

const baseUrl = gateway //  杨立强
const baseUrl7 = 'https://cj.weather.com.cn' //  天

const baseUrl9 = 'https://apip.weatherdt.com' // 天气网

// const baseUrl4 = 'http://192.168.2.61:3333' // 张超11
// const baseUrl2 = 'http://192.168.2.51:9082'
// const baseUrl3 = 'http://192.168.2.51:9081'
module.exports = {
  '/platform': {
    target: baseUrl,
    changeOrigin: true
  },
  '/cooperativeunit': {
    target: baseUrl,
    changeOrigin: true
  },
  '/token': {
    target: baseUrl,
    changeOrigin: true
  },
  '/authresource': {
    target: baseUrl,
    changeOrigin: true
  },

  '/organization': {
    target: baseUrl,
    changeOrigin: true
  },
  '/personalset': {
    target: baseUrl,
    changeOrigin: true
  },
  '/city': {
    target: baseUrl,
    changeOrigin: true
  },
  '/weatherApi': {
    target: baseUrl7,
    changeOrigin: true,
    pathRewrite: {
      '^/weatherApi': ''
    }
  },
  '/weatherdtApi': {
    target: baseUrl9,
    changeOrigin: true,
    pathRewrite: {
      '^/weatherdtApi': ''
    }
  },
  '/os-platform': {
    target: baseUrl,
    changeOrigin: true
  },
  '/os-market': {
    target: baseUrl,
    changeOrigin: true
  },
  '/company': {
    target: baseUrl,
    changeOrigin: true
  },
  '/jobadmin': {
    target: baseUrl,
    changeOrigin: true
  },
  '/companyregister': {
    target: baseUrl,
    changeOrigin: true
  },
  '/companyaudit': {
    target: baseUrl,
    changeOrigin: true
  },
  '/devicemanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/deviceordermanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/productpublish': {
    target: baseUrl,
    changeOrigin: true
  },
  '/productclassmanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/auditmanage': {
    target: baseUrl,
    changeOrigin: true
  },
  '/workflowmanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/contractmanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/projectmanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/financeclassmanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/capitalaccountmanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/projectfinancemanager': {
    target: baseUrl,
    changeOrigin: true
  },
  '/blockchainmanager': {
    target: baseUrl,
    changeOrigin: true
  }
}
