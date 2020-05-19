import request from '@/utils/request'
import qs from 'qs'

export function orderList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'order/getOrderList.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function orderDetail(data) {
    return request({
        url: process.env.VUE_APP_BASE_API + 'quertOrderItems.do',
        method: 'post',
        data: qs.stringify(data)
    })
}
  