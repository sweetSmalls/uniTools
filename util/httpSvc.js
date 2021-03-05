// 封装HTTP请求公共部分
// url 请求地址
// 请求方式
// 参数信息
import store from '../store/index.js'
export function httpSvc(url,method,data){
	console.log('路径',url)
	console.log('方法',method)
	console.log('数据',data)
	store.commit('loadShow',true)
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			method:method,
			data:data,
			header:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Token":'t4XZGxhkehZqQ58y'
			},
			// 成功使用
			success:(data)=>{
				store.commit('loadHide',false)
				resolve(data)
			},
			// 失败调用
			fail:(err)=>{
				reject(err)
			}
		})
	})
}