import request from '@/utils/request'

//获取地址信息
export function getLocationInfo(params) {
  return request({
    url: `http://110.42.220.245:8081/ServiceLoc/${params.UserID}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

//添加地址信息
export function addLocationInfo(params) {
    return request({
      url: `/ServiceLoc/${params.UserID}`,
      method: 'post',
      params: {
        Location_Name: params.Location_Name,
        Loc_Detail: params.Loc_Detail,
      }
    })
  }
  
  export function editLocationInfo(params) {
    return request({
      url: `/ServiceLoc/${params.UserID}/${params.id}`,
      method: 'post',
      params: {
        Location_Name: params.Location_Name,
        Loc_Detail: params.Loc_Detail,
      }
    })
  }