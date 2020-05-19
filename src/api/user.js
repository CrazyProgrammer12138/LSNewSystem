import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'login/signLogin.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'login/getInformationToken.do',
    method: 'post',
    data: qs.stringify(token)
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
