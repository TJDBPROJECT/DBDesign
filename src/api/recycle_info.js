import request from '@/utils/request'
//向用户展示的图片，但暂无设备图片，先用已有的代替
export function pictureget() {
  return request({
    url: '/DeviceType',
    method: 'get',
  })
}
/*创建回收订单信息*/
export function createRecycleOrder() {
  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/{id}`,
    method: 'post',
    data: {
      Device_Cate:"phone",
    Device_Type:"iPhone6",
    ExpectedPrice:100,
    Recycle_Location:"home",
    Recycle_Time:"2023-08-10T15:25:00"

    },
  });
}

