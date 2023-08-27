import request from '@/utils/request'


// 从服务器获取工程师数据的函数
export function getEngineer(params) {
  return request({
    url: 'http://110.42.220.245:8081/Engineer', // 根据实际的服务器接口地址进行替换
    method: 'get',
    params: {
        age: params.Sex,
        name: params.Name,
        experience: params.WorkingYears,
        rating: params.Rate,
      }
  });
}
