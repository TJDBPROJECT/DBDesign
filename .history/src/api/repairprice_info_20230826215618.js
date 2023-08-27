import request from '@/utils/request'
/*获取维修设备类型图片*/ 
export function pictureget() {
  return request({
    url: '/DeviceType',
    method: 'get',
  })
}
/*创建维修订单信息*/
export function createRepairOrder(uid,data) {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${uid}`,
    method: 'post',
    data: {
          CouponID: 'cou123',
          EngineerID: 'eng001',
          OptionID: 'opt123',
          RepairLocation: '同济大学19号楼',
          RepairTime: "2023-08-24 11:30:35",
          OrderPrice: data.OrderPrice,
          ProblemPart:"屏幕",
          ProblemDetail:"屏幕碎裂",
          Requirement:"换个屏幕",
          Brand:"华为",
    },
  });
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
