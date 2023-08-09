import request from '@/utils/request'
/*获取维修设备类型图片*/ 
export function pictureget() {
  return request({
    url: '/DeviceType',
    method: 'get',
  })
}
/*获取维修订单信息*/
export function repairprice_info(params) {
  return request({
    url: 'RepairOrder/{uid}',
    method: 'get',
    data: {
        RepairTime:params.RepairTime,
        CreateTime:params.CreateTime,
        UserID: params.UserID,
        Username: params.username,
        OrderPrice:params.OrderPrice,
        Brand:params.Brand,
        type_name: params.type_name,
        RepairLocation: params.RepairLocation,
    }
  })
}