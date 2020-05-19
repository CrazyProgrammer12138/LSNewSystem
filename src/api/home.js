import request from '@/utils/request'
import qs from 'qs'

export function homeData(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'index/getIndexDatas.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function personalCenterData(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'inuser/getPersonalCenterInformation.do ',
    method: 'post',
    data: qs.stringify(data)
  })
}