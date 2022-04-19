import * as request from '@/utils/request'

/**
 * 接口封装
 */
export default {
  getAnnouncementList(page,limit,announcementTitle) {
    let url = `/zzysbishe/announcementRelease/getAnnouncementList/`+page+`/`+limit+`?announcementTitle=`+announcementTitle
    return request.get(url)
  },
  addAnnouncement(announcementVo){
    let url = `/zzysbishe/announcementRelease/addAnnouncement`
    return request.post(url,announcementVo)
  },
  getAnnouncementInfo(announcementId){
    let url = `/zzysbishe/announcementRelease/getAnnouncementInfo/`+announcementId
    return request.get(url)
  },
  updateAnnouncementInfo(announcementDto){
    let url = `/zzysbishe/announcementRelease/updateAnnouncementInfo`
    return request.put(url,announcementDto)
  },
  deleteAnnouncement(uuids){
    let url= `/zzysbishe/announcementRelease/deleteAnnouncement/`+uuids
    return request.remove(url)
  },
  
}