import request from '@/utils/request'
import qs from 'qs'
/**
 * @param 获取产品列表  参数 token 
 */
export function productList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'product/newlistProduct.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 上架下架接口  参数 token 
 */
export function upperOr(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'product/upperOrLowerProduct.do',
    method: 'post',
    data: qs.stringify(data)
  })
}
/**
 * @param 获取产品详情  参数 token 
 */
export function productDetail(data) {
  return request({
      url: process.env.VUE_APP_BASE_API + 'queryProductItems.do',
      method: 'post',
      data: qs.stringify(data)
  })
}
/**
 * @param 添加产品 获取 产品类型等基本数据  参数 token 
 */
export function basicData(data) {
  return request({
      url: process.env.VUE_APP_BASE_API + 'getBasicDataToProduct.do',
      method: 'post',
      data: qs.stringify(data)
  })
}

/**
 * @param 快捷优势选择  参数 productClass 
 */
export function advantage(data) {
  return request({
      url: process.env.VUE_APP_BASE_API + 'getFastAdvantageByProductType.do',
      method: 'post',
      data: qs.stringify(data)
  })
}

/**
 * @param 添加产品   
 */
export function addProduct(data) {
  return request({
      url: process.env.VUE_APP_BASE_API + 'product/insertProduct.do',
      method: 'post',
      data: qs.stringify(data)
  })
}

/**
 * @param 存草稿箱  
 */
export function drafts(data) {
  return request({
      url: process.env.VUE_APP_BASE_API + 'product/insertDraftsProduct.do',
      method: 'post',
      data: qs.stringify(data)
  })
}

/**
 * @param 产品详情查询接口  参数 产品ID token  
 */
export function seekProduct(data) {
  return request({
      url: process.env.VUE_APP_BASE_API + 'product/getProductAllDataByProductId.do',
      method: 'post',
      data: qs.stringify(data)
  })
}