import request from '@/utils/request'


/*获取维修订单信息*/
export function repairprice_info(params) {
  return request({
    url: '/RepairOrder',
    method: 'get',
    data: {
        photo:"",
        repairtime:params.repairtime,
        Username: params.username,
        type_name: params.type_name,
        repairlocation: params.repairlocation,
    }
  })
}