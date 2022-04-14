import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getWorkApplicationList(page,limit,applyDate) {
    let url = `/zzysbishe/returnWorkApplication/getWorkApplicationList/`+page+`/`+limit+`?applyDate=`+applyDate
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
  },
  deleteHealthyRecord(uuids){
    let url= `/zzysbishe/healthyRecord/deleteHealthyRecord/`+uuids
    return request.remove(url)
  },
  getUserInfo(){
    let url = `/zzysbishe/returnWorkApplication/getUserInfo/`
    return request.get(url)
  }
  
}