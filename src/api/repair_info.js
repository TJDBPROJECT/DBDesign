import request from '@/utils/request'




// 从服务器获取工程师数据的函数
export function getEngineer(params) {
  return request({
    url: '/Engineer', // 根据实际的服务器接口地址进行替换
    method: 'get',
    params: {
        age: params.Sex,
        name: params.Name,
        experience: params.WorkingYears,
        rating: params.Rate,
      }
  });
}


/*维修订单信息*/
export function repair_info(params) {
  return request({
    url: '/RepairOrder',
    method: 'post',
    data: {
        Username: params.username,
        Telephone: params.telephone,
        repairlocation: params.repairlacation,
        type_name: params.type_name,
        repairtime: params.repairtime,
        repairrequirement: params.repairrequirement,
        engineerid: params.engineerid,
        engineername: params.engineername,
        photo:"",
    }
  })
}