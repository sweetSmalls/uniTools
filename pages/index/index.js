import { httpSvc } from '../../util/httpSvc.js'

export const tableList = params => httpSvc('https://v2.alapi.cn/api/joke','POST',params) 