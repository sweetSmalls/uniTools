import { httpSvc } from './httpSvc.js'
// 获取新闻列表
export const tableList = params => httpSvc('/zhihu/latest','POST',params,'1') 
// 获取新闻详情信息
export const newDetails = params => httpSvc('/zhihu/news','POST',params,'1') 