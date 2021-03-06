import { httpSvc } from './httpSvc.js'
// 获取新闻列表
export const tableList = params => httpSvc('/zhihu/latest','POST',params,'2') 
// 获取新闻详情信息
export const newDetails = params => httpSvc('/zhihu/news','POST',params,'2') 
// 毒鸡汤
export const jiTangs = params =>httpSvc('/soul','POST',params,'2')
// 土味情话
export const qingHua = params => httpSvc('/qinghua','POST',params,'2')
// 快递查询
export const courier = params => httpSvc('/kd','POST',params,'2')
// 垃圾分类
export const laJi = params => httpSvc('/lajifenlei','POST',params,'1')