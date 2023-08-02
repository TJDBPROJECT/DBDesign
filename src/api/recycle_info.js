import request from '@/utils/request'
//向用户展示的图片，但暂无设备图片，先用已有的代替
export function pictureget() {
  return request({
    url: '/DeviceType',
    method: 'get',
  })
}

/*回收订单信息*/
export function recycle_info(params) {
  return request({
    url: '/RecycleOrder',
    method: 'post',
    params: {
      device_cate: params.device_cate,
      device_type: params.device_type,
      expectedprice: params. ExpectedPrice,
      recycle_location: params.Recycle_Location,
      recycle_time: params.Recycle_Time,
    }
  })
}

// “device_cate”:string,
// “device_type”:string,
// “ExpectedPrice”:float,
// “Recycle_Location”:string,
// “Recycle_Time”:DateTime
