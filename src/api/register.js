import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  register(registerVo) {
    let url = `/zzysbishe/user/register`
    return request.post(url,registerVo)
  },
  
  
}