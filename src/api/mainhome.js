import request from '@/utils/request'


export function getUserProfile(params) {
  return request({
    url: `/UserInfo/${params.UserID}`, // 使用params.UserID来替代路径参数
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}