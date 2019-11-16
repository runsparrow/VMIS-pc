import request from '@/utils/request';
import { APIHOSTNAME } from '../constants/API'

export async function query() {
  return request('/api/users');
}
export async function queryCurrent(token) {
  return request(`${APIHOSTNAME}/ERP/Auth/GetAuthEntity?token=${token}`,{
    method:"POST"
  })
}
export async function queryNotices() {
  return request('/api/notices');
}
