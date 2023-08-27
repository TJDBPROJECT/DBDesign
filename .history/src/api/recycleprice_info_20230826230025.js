import request from '@/utils/request'


/*创建回收订单信息*/
export const insertNavigationUpload = (formData) => {
  const id = formData.get('id'); // 从 formData 中提取 'id'
  const jsonData = formData.get('Json'); // 从 formData 中提取 'Json'

  // 解析 JSON 数据
  const formDataObject = JSON.parse(jsonData);

  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${id}`,
    method: 'POST',
    data: formDataObject, // 使用解析后的 JSON 数据作为请求数据
    headers: { 'Content-Type': 'application/json' }, // 设置请求头为 application/json
  });
};



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

