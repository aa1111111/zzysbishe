import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
    getHealthyRecordList(page,limit) {
    let url = `/zzysbishe/healthyRecord/getHealthyRecordList/`+page+`/`+limit
    return request.get(url)
  },
  addHealthyRecord(healthyRecord){
    let url = `/zzysbishe/healthyRecord/addHealthyRecord`
    return request.post(url,healthyRecord)
  },
  getHealthyRecordInfo(recordId){
    let url = `/zzysbishe/healthyRecord/getHealthyRecordInfo/`+recordId
    return request.get(url)
  },
  updateHealthyRecord(healthyRecord){
    let url = `/zzysbishe/healthyRecord/updateHealthyRecord`
    return request.put(url,healthyRecord)
  }
  
}