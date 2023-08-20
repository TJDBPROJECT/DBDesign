import request from '@/utils/request'

export function getRecycleOrderInfo(params) {
  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${params.UserID}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}


export function editRecycleOrderInfo(params) {
  return request({
    url: `/RecycleOrder/${params.id}/${params.orderid}`,
    method: 'post',
    data: {
      ExpectedPrice: params.ExpectedPrice,
      Recycle_Location: params.Recycle_Location,
      Recycle_Time: params.Recycle_Time
    }
  });
}

export function getRepairOrderInfo(params) {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${params.UserID}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}


export function editRepairOrderInfo(params) {
  return request({
    url: `/RepairOrder/${params.uid}/${params.id}`,
    method: 'post',
    data: {
      CouponID: params.CouponID,
      EngineerID: params.EngineerID,
      OptionID: params.OptionID,
      RepairLocation: params.RepairLocation,
      RepairTime: params.RepairTime,
      OrderStatus: params.OrderStatus
    }
  });
}