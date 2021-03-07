import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import httpSvc from './util/httpSvc.js'
import store from './store/index.js'  // 引入数据管理
import './style/default.css'
Vue.prototype.$store = store
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store   //将store挂载到vue全局实例上
})
app.$mount()
