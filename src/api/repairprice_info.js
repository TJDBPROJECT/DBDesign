import request from '@/utils/request'
/*获取维修设备类型图片*/ 
export function pictureget() {
  return request({
    url: '/DeviceType',
    method: 'get',
  })
}
/*获取维修订单信息*/
export function repair_info(params) {
  return request({
    url: `/api/RepairOrder/${params.uid}`,
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
