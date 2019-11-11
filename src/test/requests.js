/* eslint-disable */
// eslint-disable-next-line
import axios from 'axios'
import { Message, MessageBox ,Loading} from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:4000', //在config-dev.env.js中设置 可以process.env.BASE_API
  timeout: 5000 // 请求超时时间
})
let loadingInstance;
// request拦截器
service.interceptors.request.use(
  config => {
    loadingInstance  = Loading.service({ //加载loading
      fullscreen: true, 
      text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)' 
      });
    if (store.getters.token) { //vuex 管理token 后面在学习
     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // config.method === 'post'
    //     ? config.data = qs.stringify({...config.data})
    //     : config.params = {...config.params};

    //加上headers的属性
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept-Language'] = 'zh-cn';

    return config
  },
  error => {
    // 请求失败情况
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
      loadingInstance.close();
      //  接口请求成功，业务层逻辑处理 
      console.log(response.data)
      console.log(response.data.code)
      switch (response.data.code) {
        case 20001: //业务逻辑错误
          // 清除token，后续集成vuex进行管理
          //弹出消息
          Message({
          message: '系统错误',
          type: 'error',
          duration: 5 * 1000
         })
          return Promise.reject('error')
        case 20002://若20002定义为token过期
            //弹出消息框
            MessageBox.confirm( //element-ui 弹窗
              '你的登录已过期，请重新登录',
              '确定登出',
              {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
             //后面 vuex 清除token 跳转到登录页面
            }).catch(() => {
            }); 
            return Promise.reject('error')
        case 20000:
          return response.data
      }
    },
  error => {
    loadingInstance.close();
    console.log('err' + error)
    MessageBox({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
