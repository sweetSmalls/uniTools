import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
// 通过vuex构造函数创建store对象
const store = new Vuex.Store({
	state:{
		show:'111',
		loadingStatus:false   // 加载动画状态
	},
	mutations:{
		loadShow(state,params){
			console.log("展示",params)
			state.loadingStatus = params
		},
		loadHide(state,params){
			state.loadingStatus = params
		}
	},
	actions:{
		
	}
})

export default store  // 导出store对象
