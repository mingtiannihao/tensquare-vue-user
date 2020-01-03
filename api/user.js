import request from '@/utils/request'
const group_name = 'user'
const api_name = 'user'
export default {
    sendsms(mobile){
        return request({
            url:`/${group_name}/${api_name}/sendsms/${mobile}`,
            method: 'post'
        })
    },
    register(user,code){
        return request({
            url:`/${group_name}/${api_name}/register/${code}`,
            method: 'post'
        })
    },
    login(mobile,password){
        return request({
            url:`/${group_name}/${api_name}/login`,
            method: 'post',
            data: {
                mobile,
                password
            }
        })
    },
    info(){
       return request({
           url: `/${group_name}/${api_name}/info`,
           method: 'get'
       }) 
    },
    saveinfo(user){
        return request({
            url: `/${group_name}/${api_name}/saveinfo`,
            method: 'put',
            data: user
        })
    }
}