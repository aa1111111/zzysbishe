import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getWorkApplicationList(page,limit,applyDate,userName) {
    let url = `/zzysbishe/returnWorkApplication/getWorkApplicationList/`+page+`/`+limit+`?applyDate=`+applyDate+`&&userName=`+userName
    return request.get(url)
  },
  addReturnApplication(returnApplication){
    let url = `/zzysbishe/returnWorkApplication/addReturnApplication`
    return request.post(url,returnApplication)
  },
  getReturnApplication(id){
    let url = `/zzysbishe/returnWorkApplication/getReturnApplication/`+id
    return request.get(url)
  },
  updateReturnApplication(returnApplication){
    let url = `/zzysbishe/returnWorkApplication/updateReturnApplication`
    return request.put(url,returnApplication)
  },
  deleteReturnApplication(uuids){
    let url= `/zzysbishe/returnWorkApplication/deleteReturnApplication/`+uuids
    return request.remove(url)
  },
  checkApplication(uuids){
    let url= `/zzysbishe/returnWorkApplication/checkApplication/`+uuids
    return request.get(url)
  }
  
}