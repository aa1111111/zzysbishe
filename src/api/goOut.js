import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getOutApplicationList(page,limit,applyDate,userName) {
    let url = `/zzysbishe/goOutApplication/getOutApplicationList/`+page+`/`+limit+`?applyDate=`+applyDate+`&&userName=`+userName
    return request.get(url)
  },
  addOutApplication(goOutApplication){
    let url = `/zzysbishe/goOutApplication/addOutApplication`
    return request.post(url,goOutApplication)
  },
  getOutApplication(id){
    let url = `/zzysbishe/goOutApplication/getOutApplication/`+id
    return request.get(url)
  },
  updateOutApplication(goOutApplication){
    let url = `/zzysbishe/goOutApplication/updateOutApplication`
    return request.put(url,goOutApplication)
  },
  deleteOutApplication(uuids){
    let url= `/zzysbishe/goOutApplication/deleteOutApplication/`+uuids
    return request.remove(url)
  },
  checkApplication(uuids){
    let url= `/zzysbishe/goOutApplication/checkApplication/`+uuids
    return request.get(url)
  },
  getHistoryJourney(page,limit,userName){
    let url= `/zzysbishe/goOutApplication/getHistoryJourney/`+page+`/`+limit+`?userName=`+userName
    return request.get(url)
  }
  
}