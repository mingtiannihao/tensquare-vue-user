import axios from 'axios'
import { getUser} from '@/utils/auth'
// 创建axios实例
const service = axios.create({
    baseURL: ' http://localhost:7300/mock/5e01d10769b9cb1aa8484542', // api的base_url
    timeout: 30000 ,// 请求超时时间
    headers: { 'Authorization': 'Bearer  '+ getUser().token }
  })
export default service