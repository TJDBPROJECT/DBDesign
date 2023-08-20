import request from '@/utils/request';

export function getRecycleOrderInfo(id) {
  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${id}`,
    method: 'get'
  });
}

export function editRecycleOrderInfo(id, orderid, data) {
  return request({
    url: `http://110.42.220.245:8081/RecycleOrder/${id}/${orderid}`,
    method: 'post',
    data
  });
}

export function getRepairOrderInfo(uid) {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${uid}`,
    method: 'get'
  });
}

export function editRepairOrderInfo(uid, id, data) {
  return request({
    url: `http://110.42.220.245:8081/RepairOrder/${uid}/${id}`,
    method: 'post',
    data
  });
}