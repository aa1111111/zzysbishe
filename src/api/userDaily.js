import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
    getHealthyRecordList(page,limit,recordDate) {
    let url = `/zzysbishe/healthyRecord/getHealthyRecordList/`+page+`/`+limit+`?recordDate=`+recordDate
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
  getRecentRecord(){
    let url= `/zzysbishe/healthyRecord/getRecentRecord/`
    return request.get(url)
  },
  getRecordDtoList(page,limit,querySearch){
    let url = `/zzysbishe/healthyRecord/getRecordDtoList/`+page+`/`+limit
    return request.post(url,querySearch)
  },
  checkHealthyRecord(uuids){
    let url= `/zzysbishe/healthyRecord/checkHealthyRecord/`+uuids
    return request.get(url)
  }
  
}