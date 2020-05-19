import request from '@/utils/request'
import qs from 'qs'
/**
 * @param 
 */
export function partnerList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'user/userManager.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 
 */
export function partnerDetail(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'queryAgentItems.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 
 */
export function broker(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'inuser/getCityPartnerList.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 
 */
export function brokerDetail(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'queryCityPartnerItem.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 
 */
export function getCityList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'getCityList.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 新建合伙人
 */
export function addPartner(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'inuser/insertCityPartner.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 
 */
export function posterData(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'getRecruitmentPosterPhoto.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/** 
 * @param 获取区域列表  参数 userId  获取各地区渠道  传参areaId
 */
export function LSFiliale(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'getAllAreaOrManagerList.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

/**
 * @param 更改客户经理  参数 token  userId   inuserId 
 */
export function LSManager(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + '/changeAgentsManager.do',
    method: 'post',
    data: qs.stringify(data)
  })
}