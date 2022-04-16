import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  userLogin(loginVo) {
    let url = `/zzysbishe/user/login`
    return request.post(url,loginVo)
  },
  getUnitList(){
    let url = `/zzysbishe/unit/getUnitList`
    return request.get(url)
  },
  identify(identifyVo){
    let url = `/zzysbishe/user/identify`
    return request.put(url,identifyVo)
  },
  getUserInfo(){
    let url = `/zzysbishe/user/getUserInfo`
    return request.get(url)
  },
  modifyUserInfo(userBaseInfo){
    let url = `/zzysbishe/user/updateUserBaseInfo`
    return request.put(url,userBaseInfo)
  },
  userLoginOut(){
    let url = `/zzysbishe/user/loginOut`
    return request.get(url)
  }
}