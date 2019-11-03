import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'
import { stringify } from 'qs';

export async function getsitelist() {
  return request(`${APIHOSTNAME}/ERP/SRM/Site/Read/Rows`, {
    method: 'POST',
  });
}

export async function addsite(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Site/Create?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

// export async function getuser(param) {
//   return request(`${APIHOSTNAME}/ERP/AVM/User/Read/Row?${stringify(param, { allowDots: true})}`, {
//     method: 'POST'
//   });
// }

export async function updatesite(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Site/Update?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function delsite(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Site/Delete?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}