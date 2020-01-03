import request from '@/utils/request'
const api_group = 'spit'
const api_name = 'spit'
export default {
  page(page,size) {   
    return request({
      url: `/${api_group}/${api_name}/search/${page}/${size}`,
      method: 'post'
    })
  },
  thumbup(id) {
    return request({
      url: `/${api_group}/${api_name}/thumbup/${id}`,
      method: 'put'
    })
  },
  // submit(content){
  //   return request({
  //     url: `/${api_group}/${api_name}`,
  //     method: 'post',
  //     data: {content}
  //   })
  // },
  submit(content, parentid){
    return request({
      url: `/${api_group}/${api_name}`,
      method: 'post',
      data: {content,parentid}
    })
  },
  findById(id){
    return request({
      url: `/${api_group}/${api_name}/${id}`,
      method: 'get'
    })
  },
  commentlist(id){
    return request({
      url: `/${api_group}/${api_name}/commentlist/${id}`,
      method: 'get'
    })
  },
  save(pojo) {
    return request({
      url: `/${api_group}/${api_name}`,
      method: 'post',
      data: pojo
    })
  }
}
