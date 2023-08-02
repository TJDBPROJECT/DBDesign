import request from '@/utils/request'


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