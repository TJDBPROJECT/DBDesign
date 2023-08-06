import request from '@/utils/request'

//获取地址信息
export function getLocationInfo(params) {
  return request({
    url: `/ServiceLoc/${params.uid}`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function addLocationInfo(params) {
    return request({
      url: `/ServiceLoc/${params.uid}`,
      method: 'post',
      params: {
        Location_Name: params.Location_Name,
        Loc_Detail: params.Loc_Detail,
      }
    })
  }
  
  export function editLocationInfo(params) {
    return request({
      url: `/ServiceLoc/${params.uid}/{params.id}`,
      method: 'post',
      params: {
        Location_Name: params.Location_Name,
        Loc_Detail: params.Loc_Detail,
      }
    })
  }