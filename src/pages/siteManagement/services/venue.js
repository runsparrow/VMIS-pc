import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'
import { stringify } from 'qs';

export async function getvenuelist(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Venue/Read/Rows?${stringify(param, { allowDots: true,encodeValuesOnly: true})}`, {
    method: 'POST',
  });
}

export async function addvenue(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Venue/Create?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

// export async function getuser(param) {
//   return request(`${APIHOSTNAME}/ERP/AVM/User/Read/Row?${stringify(param, { allowDots: true})}`, {
//     method: 'POST'
//   });
// }

export async function updatevenue(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Venue/Update?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function delvenue(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Venue/Delete?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}