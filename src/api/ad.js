import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getManagerList(page,limit,userName) {
    let url = `/zzysbishe/user/getManagerList/`+page+`/`+limit+`?userName=`+userName
    return request.get(url)
  },
  deleteManager(uuids){
    let url= `/zzysbishe/user/deleteUser/`+uuids
    return request.remove(url)
  },
  saveManager(managerVo){
    let url= `/zzysbishe/user/saveManager`
    return request.post(url,managerVo)
  }
}