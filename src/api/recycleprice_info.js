import request from '@/utils/request'


const id=10000;
/*创建回收订单信息*/
export function createRecycleOrder() {
  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${id}`,
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
/*获取回收订单信息*/
export function recycle_info(params) {
  return request({
    url: `/api/RecycleOrder/${params.id}`,
    method: 'get',
    data: {
        Username: params.username,
        Telephone: params.telephone,
        recyclelocation: params.recyclelacation,
        type_name: params.type_name,
        recycletime: params.recycletime,
    }
  })
}