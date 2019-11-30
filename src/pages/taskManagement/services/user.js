import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'

export async function getuserlist() {
  return request(`${APIHOSTNAME}/ERP/AVM/User/Read/Rows`, {
    method: 'POST',
  });
}
