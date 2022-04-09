import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
    getHealthyRecordList(page,limit) {
    let url = `/zzysbishe/healthyRecord/getHealthyRecordList/`+page+`/`+limit
    return request.get(url)
  },
  
  
}