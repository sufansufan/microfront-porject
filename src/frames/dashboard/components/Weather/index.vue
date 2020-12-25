<template>
  <el-popover
    id="weather"
    popper-class="weather-popper"
    placement="bottom"
    trigger="hover"
    class="weather"
    :disabled="loading"
  >
    <div
      slot="reference"
      v-loading="loading"
      class="weather-button"
      element-loading-text="正在加载天气..."
      element-loading-spinner="weather-button-loading-spinner"
    >
      <img
        :src="'https://apip.weatherdt.com/float/static/images/alarm_'+data.now.wind_sc+'.png'"
        style="display: inline-block; vertical-align: middle; width: 12px; padding: 0px; margin: 0px;"
      >
      <div style="display: inline-block; vertical-align: middle; margin: 0px;">{{ data.basic.city }}</div>
      <img
        :src="'https://apip.weatherdt.com/float/static/images/cond/cond-a-'+data.now.code+'d.png'"
        style="display: inline-block; vertical-align: middle; width: 32px; position: relative;"
      >
      <div style="display: inline-block; vertical-align: middle; position: relative; top: 1px;">{{ data.now.tmp }}°C</div>
      <div style="display: inline-block; vertical-align: middle; margin: 0px;">{{ data.aqi.txt }}</div>
    </div>
    <div class="weather-content">
      <div class="weather-content-header">
        <i class="el-icon-location" style="color:#0a4c8a" />
        <span
          style="font-size:14px; font-family:Microsoft YaHei; font-weight:400; color:rgba(102,102,102,1);"
        >{{ data.basic.city }}</span>
        <span
          style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(102,102,102,1);float:right"
        >{{ data.basic.updateTime }}</span>
      </div>
      <div class="weather-content-body">
        <div style="display: flex;flex-direction:column">
          <div class="weather-content-body-today">
            <div>
              <img
                style="width:36px;height:38px;margin-top: calc((56px - 38px) / 2);float: left"
                :src="'https://apip.weatherdt.com/float/static/images/cond/cond-a-'+data.now.code+'d.png'"
              >
              <div style="float: left;margin-top: 8px;text-align:center;margin-left:10px">
                <span
                  style="font-size:14px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);"
                >{{ data.now.txt }}</span>
                <br>
                <span
                  style="font-size:14px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);"
                >{{ data.now.tmp }}°C</span>
              </div>
              <div style="float: left;text-align:center;margin-top: 6px;margin-left:10px">
                <img
                  :style="'width:'+(data.now.pcpn>0?'19':'0')+'px;height:19px;'"
                  src="https://apip.weatherdt.com/float/static/images/water-blue.png"
                >
                <br>
                <span
                  style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(36,160,86,1);"
                >| {{ data.aqi.txt }}</span>
              </div>
              <!-- <div
                style="background:rgba(10,76,138,1);border-radius:10px;padding: 3px 10px;display:inline;float: left;margin-top: calc(31px / 2);margin-left:10px"
              >
                <span
                  style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(255,255,255,1);"
                >大风预警</span>
              </div> -->
            </div>
          </div>
          <div class="weather-content-body-future">
            <div
              v-for="(item,index) in data.forecast.forecast"
              :key="index"
              style="display: flex;justify-content:flex-start"
            >
              <div
                style="width: 120px;height: 95px;flex-direction: column;display: flex;text-align: center;padding-top: 13px;"
              >
                <div>
                  <span
                    style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(102,102,102,1)"
                  >{{ index == 0?getDay(0):'' }}{{ index == 1?getDay(1):'' }}{{ index == 2?getDay(2):'' }}</span>
                  <span
                    style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(0,153,68,1);"
                  >{{ data.airForecast[index].txt }}</span>
                </div>
                <div>
                  <img
                    style="width:25px;height:25px;"
                    :src="'https://apip.weatherdt.com/float/static/images/cond/cond-a-'+item.tqw_code_d+'d.png'"
                  >
                </div>
                <span
                  style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);"
                >{{ item.tqw_txt_d }}</span>
                <span>
                  <span style="color:#0a4c8a">{{ item.tmp_min }}°C</span> ~
                  <span style="color:#fa5151">{{ item.tmp_max }}°C</span>
                </span>
              </div>
              <div
                v-if="index!=2"
                style="width: 1px;height: 46px;background: rgb(238, 238, 238);margin-top: 31px;"
              />
            </div>
          </div>
        </div>
        <div style="width:1px;height:144px;background:rgba(238,238,238,1);margin-top:10px" />
        <div style="width:146px;height:164px;display: flex;flex-direction:row">
          <div style="width: 81px;height: 164px;display: flex;flex-direction: column;">
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);margin: 24px 0 0 10px;"
            >{{ data.now.wind_dir_txt }}</span>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);margin: 16px 0 0 10px;"
            >降水量</span>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);margin: 16px 0 0 10px;"
            >湿度</span>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(51,51,51,1);margin: 16px 0 0 10px;"
            >大气压强</span>
          </div>
          <div style="width:65px;height: 164px;display: flex;flex-direction: column;">
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(153,153,153,1);;margin: 24px 0 0 0px;"
            >{{ data.now.wind_sc }}级</span>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(153,153,153,1);;margin: 16px 0 0 0px;"
            >{{ data.now.pcpn }}mm</span>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(153,153,153,1);;margin: 16px 0 0 0px;"
            >{{ data.now.hum }}%</span>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(153,153,153,1);;margin: 16px 0 0 0px;"
            >{{ data.now.pres }}hpa</span>
          </div>
        </div>
        <div style="width:1px;height:144px;background:rgba(238,238,238,1);margin-top:10px" />
        <div
          style="width:58px;height:164px;display: flex;flex-direction: column;align-items: center; justify-content: center;"
        >
          <div style="text-align: center;display: flex;flex-direction: column;">
            <div style="height: 25px;">
              <img
                src="https://apip.weatherdt.com/float/static/images/lifestyle-cw-a.png"
                style="width: 25px;height:25px"
              >
            </div>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(102,102,102,1);"
            >{{ data.lifestyleForecast.lifestyle[0].cw.brf }}</span>
          </div>
          <div style="text-align: center;">
            <div style="height: 25px;">
              <img
                src="https://apip.weatherdt.com/float/static/images/lifestyle-drsg-a.png"
                style="width: 25px;height:25px"
              >
            </div>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(102,102,102,1);"
            >{{ data.lifestyleForecast.lifestyle[0].drsg.brf }}</span>
          </div>
          <div style="text-align: center;">
            <div style="height: 25px;">
              <img
                src="https://apip.weatherdt.com/float/static/images/lifestyle-uv-a.png"
                style="width: 25px;height:25px"
              >
            </div>
            <span
              style="font-size:12px; font-family:Microsoft YaHei; font-weight:400; color:rgba(102,102,102,1);"
            >{{ data.lifestyleForecast.lifestyle[0].uv.brf }}</span>
          </div>
        </div>
      </div>
      <div class="weather-content-line" />
      <div class="weather-content-floot">
        <a href="http://www.weather.com.cn">数据来源于天气网</a>
      </div>
    </div>
  </el-popover>
</template>

<script>
import axios from 'axios'
import request from '@core/api/config/axios'

export default {
  props: {
    ip: {
      default: '',
      type: String
    },
    adcode: {
      default: '',
      type: String
    },
    code: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      loading: true,
      key: '',
      data: {
        'status': 'ok',
        'basic': {
          'city': '西安',
          'cnty': '中国',
          'id': '101110101',
          'lat': '34.26316071',
          'lon': '108.94802094',
          'parent_city': '西安',
          'prov': '陕西',
          'updateTime': '14:25'
        },
        'now': {
          'code': '00',
          'hum': '28',
          'pcpn': '0.0',
          'pres': '966',
          'tmp': '26',
          'txt': '晴',
          'wind_dir_txt': '东南风',
          'wind_sc': '2'
        },
        'aqi': {
          'aqi': '56',
          'txt': '良'
        },
        'forecast': {
          'date': '202004080800',
          'forecast': [{
            'tmp_max': '26',
            'tmp_min': '10',
            'tqw_code_d': '00',
            'tqw_code_n': '00',
            'tqw_txt_d': '晴',
            'tqw_txt_n': '晴'
          }, {
            'tmp_max': '26',
            'tmp_min': '11',
            'tqw_code_d': '02',
            'tqw_code_n': '02',
            'tqw_txt_d': '阴',
            'tqw_txt_n': '阴'
          }, {
            'tmp_max': '17',
            'tmp_min': '7',
            'tqw_code_d': '02',
            'tqw_code_n': '07',
            'tqw_txt_d': '阴',
            'tqw_txt_n': '小雨'
          }]
        },
        'lifestyleForecast': {
          'lifestyle': [{
            'cw': {
              'brf': '适宜',
              'txt': '适宜洗车，未来持续两天无雨天气较好，适合擦洗汽车，蓝天白云、风和日丽将伴您的车子连日洁净。'
            },
            'drsg': {
              'brf': '舒适',
              'txt': '建议着长袖T恤、衬衫加单裤等服装。年老体弱者宜着针织长袖衬衫、马甲和长裤。'
            },
            'uv': {
              'brf': '很强',
              'txt': '紫外线辐射极强，建议涂擦SPF20以上、PA++的防晒护肤品，尽量避免暴露于日光下。'
            }
          }],
          'updateTime': '202004080800'
        },
        'alarm': [{
          'level': '蓝色',
          'link': '101100905-20180928120753-0501.html',
          'type': '大风'
        }],
        'airForecast': [{
          'aqi': '55',
          'txt': '良'
        }, {
          'aqi': '58',
          'txt': '良'
        }, {
          'aqi': '40',
          'txt': '优'
        }]
      }
    }
  },
  watch: {
  },
  mounted() {
    this.loadData()
  },
  methods: {
    getDay(dayNum) {
      const day = new Date()
      day.setDate(day.getDate() + dayNum)
      return day.getMonth() + 1 + '月' + day.getDate() + '日'
    },
    loadData() {
      this.loading = true
      this.getKey().then(getKeyRes => {
        const key = getKeyRes.msg
        if (this.ip) {

        } else if (this.adcode) {

        } else if (this.code) {

        } else {
          this.getCityByIP().then(getCityByIPRes => {
            const adcode = getCityByIPRes.adcode
            this.getCityByAdcode(adcode).then(getCityCodeByAdcodeRes => {
              const code = getCityCodeByAdcodeRes.cityCode
              this.getDataByCode(key, code).then(data => {
                if (data.status == 'ok') {
                  this.data = data
                  this.loading = false
                } else {
                  setTimeout(() => {
                    this.loadData()
                  }, 10000)
                }
              })
            })
          })
        }
      })
    },
    getKeyAndData() {
      this.getKey().then(getKeyRes => {
        this.key = getKeyRes.msg
        this.getCityByIP().then(getCityByIPRes => {
          const adcode = getCityByIPRes.adcode
          this.getCityByAdcode(adcode).then(getCityCodeByAdcodeRes => {
            const code = getCityCodeByAdcodeRes.cityCode
            this.getDataByCode(key, code).then(data => {
              if (data.status == 'ok') {
                this.data = data
                this.loading = false
              } else {
                setTimeout(() => {
                  this.loadData()
                }, 10000)
              }
            })
          })
        })
      })
    },
    getKey() {
      const params = {
        now: 11,
        aqi: 1,
        alarm: 1,
        style: 1,
        position: 1,
        background: 1,
        language: 1,
        unit: 1,
        city: 1,
        forecast: 0,
        airForecast: 0,
        lifestyle: 0,
        updateTime: 0,
        preview: true
      }
      return new Promise((reslove, reject) => {
        axios.get('weatherApi/plugin/preview', { params })
          .then((res) => {
            reslove(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getCityByIP() {
      return new Promise((reslove, reject) => {
        this.Jsonp('https://restapi.amap.com/v3/ip?key=f11845e043e81879739e937a449b3707&s=rsv3').then((res) => {
          reslove(res)
        })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getCityByAdcode(adcode) {
      const params = {
        zoningCode: adcode
      }
      return new Promise((reslove, reject) => {
        request({
          url: '/city/city/get',
          method: 'get',
          params
        }).then((res) => {
          reslove(res.data[0])
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getDataByCode(key, code) {
      const params = {
        key: key,
        lang: 'zh',
        location: code
      }
      return new Promise((reslove, reject) => {
        axios.get('/weatherdtApi/plugin/data', { params })
          .then((res) => {
            reslove(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.weather-content-header {
  padding: 0 10px;
  width: 550px;
  height: 41px;
  background: rgba(245, 245, 245, 1);
  border-radius: 5px 5px 0px 0px;
  line-height: 41px;
}
.weather-content-body {
  width: 570px;
  height: 164px;
  display: flex;
  justify-content: flex-start;
}
.weather-content-body-today {
  width: 361px;
  height: 56px;
  display: flex;
  justify-content: center;
}
.weather-content-body-future {
  width: 361px;
  height: 109px;
  display: flex;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 1);
}
.weather-content-line {
  width: 548px;
  height: 1px;
  margin-left: calc((570px - 548px) / 2);
  background: rgba(238, 238, 238, 1);
}
.weather-content-floot {
  width: 570px;
  height: 41px;
  text-align: center;
  line-height: 41px;
}
.weather-content-floot a {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  text-decoration: none;
}
</style>
<style lang="less">
.weather-popper {
  padding: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.weather-button-loading-spinner {
  width: 0%;
  height: 0%;
}

.weather-button .el-loading-text {
  margin-top: 10px;
}
#weather {
  .el-loading-mask {
    z-index: 200 !important;
  }
}

</style>
