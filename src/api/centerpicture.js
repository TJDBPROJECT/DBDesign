

//维修中心信息获取
import request from '@/utils/request';

// 从服务器获取数据的函数
export function getData(params) {
  return request({
    url: '/ServiceCenter', // 根据实际的服务器接口地址进行替换
    method: 'get',
    params: {
        id: params.ID,
        name: params.Name,
        loc_detail: params.Loc_Detail,
        tel: params.Tel,
        image: params.TIMG_URL,
      }
  });
}
