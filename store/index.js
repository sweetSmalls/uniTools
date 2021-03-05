import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex
// 通过vuex构造函数创建store对象
const store = new Vuex.Store({
	state:{
		loadingStaus:false   // 加载动画状态
		
	},
	mutations:{
		loadShow(state,params){
			state.loadingStaus = params
		},
		loadHide(state,params){
			state.loadingStaus = params
		}
	},
	actions:{
		
	}
})

export default store  // 导出store对象
