import request from '@/utils/request'
/*获取维修设备类型图片*/ 
export function pictureget() {
  return request({
    url: '/DeviceType',
    method: 'get',
  })
}
/*创建维修订单信息*/
export const insertNavigationUpload = (formData) => {
  const id = formData.get('id'); // 从 formData 中提取 'id'

  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${id}`,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};



/*获取维修订单信息*/
export function repair_info(params) {
  return request({
    url: `/api/RecycleOrder/${params.id}`,
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
    }
  })
}


