import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getAnnouncementList(page,limit) {
    let url = `/zzysbishe/announcementRelease/getAnnouncementList/`+page+`/`+limit
    return request.get(url)
  },
}