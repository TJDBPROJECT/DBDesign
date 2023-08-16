import request from '@/utils/request'


export function getUserProfile(params) {
  return request({
    url: `http://110.42.220.245:8081/UserInfo/${params.UserID}`, // 使用params.UserID来替代路径参数
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}