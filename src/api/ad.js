import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getManagerList(userName) {
    let url = `/zzysbishe/user/getManagerList?userName=`+userName
    return request.get(url)
  },
  deleteManager(uuids){
    let url= `/zzysbishe/user/deleteUser/`+uuids
    return request.remove(url)
  }
}