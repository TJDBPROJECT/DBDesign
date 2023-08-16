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
const uid=10000;
/*创建维修订单信息*/
export function createRepairOrder() {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${uid}`,
    method: 'post',
    data: {
      CouponID: "cou123",
      EngineerID:"eng001",
      OptionID: "opt123",
      RepairLocation: "TBD",
      RepairTime: "2023-08-03T15:31:57",
    },
  });
}
/*获取维修订单信息*/
export function repair_info(params) {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${params.uid}`,
    method: 'get',
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

