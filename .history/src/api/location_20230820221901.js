import request from '@/utils/request'

//获取地址信息
export function getLocationInfo(UserID) {
  return request({
    url: "/ServiceLoc/"+ UserID,
    method: 'get',
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