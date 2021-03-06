// 封装HTTP请求公共部分
// url 请求地址
// 请求方式
// 参数信息
import store from '../store/index.js'
export function httpSvc(url,method,data,apiType){
	let baseURL = apiType == '1' ? 'https://v1.alapi.cn/api' : 'https://v2.alapi.cn/api'
	store.commit('loadShow',true)
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseURL+url,
			method:method,
			data:data,
			header:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Token": apiType == '1' ? '' : 't4XZGxhkehZqQ58y'
			},
			// 成功使用
			success:(data)=>{
				store.commit('loadHide',false)
				console.log("数据",data)
				if(data.data.code === 200){
					resolve(data.data.data)
				}else{
					uni.showModal({
					    content:'网络出小差啦,请稍后重试',
						confirmColor:'#FF6321',
						showCancel:false
					});
				}
			},
			// 失败调用
			fail:(err)=>{
				uni.showModal({
				    content:err,
					showCancel:false
				});
				reject(err)
			}
		})
	})
}