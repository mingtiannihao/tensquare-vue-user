import request from '@/utils/request'
const api_group = 'qa'
const api_name = 'problem'
export default {
  list(type,page,size) {   
    return request({
      url: `/${api_group}/${api_name}/${type}/${page}/${size}`,
      method: 'get'
    })
  },
  listByLabelId(type,labelId,page,size) {   
    return request({
      url: `/${api_group}/${api_name}/${type}/${labelId}/${page}/${size}`,
      method: 'get'
    })
  },
  submit(content,){
    return request({
      url: `/${api_group}/${api_name}`,
      method: 'post',
      data: {content}
    })
  },

}
