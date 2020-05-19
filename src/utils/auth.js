import Cookies from 'js-cookie'
import qs from 'qs'
const TokenKey = 'template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function loginData(data){
  return Cookies.set('loginData', unescape(qs.stringify(data)))
}

export function getLogindData() {
  return Cookies.get('loginData')
}

export function getRoleid() {
  return Cookies.get('roleid')
}

export function setRoleid(roleid) {
  return Cookies.set('roleid', roleid)
}

export function getPhone() {
  return Cookies.get('phone')
}

export function setPhone(phone) {
  return Cookies.set('phone', phone)
}