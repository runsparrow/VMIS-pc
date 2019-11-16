import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'
import { stringify } from 'qs';

export async function gettasklist(param) {
  return request(`${APIHOSTNAME}/ERP/BPM/task/Read/Rows?${stringify(param, { allowDots: true, encodeValuesOnly: true })}`, {
    method: 'POST',
  });
}

export async function addtask(param) {
  console.log("1")
  return request(`${APIHOSTNAME}/ERP/BPM/task/Create?${stringify(param, { allowDots: true })}`, {
    method: 'POST'
  });
}

// export async function getuser(param) {
//   return request(`${APIHOSTNAME}/ERP/BPM/User/Read/Row?${stringify(param, { allowDots: true})}`, {
//     method: 'POST'
//   });
// }

export async function updatetask(param) {
  return request(`${APIHOSTNAME}/ERP/BPM/task/Update?${stringify(param, { allowDots: true })}`, {
    method: 'POST'
  });
}

export async function deltask(param) {
  return request(`${APIHOSTNAME}/ERP/BPM/task/Delete?${stringify(param, { allowDots: true })}`, {
    method: 'POST'
  });
}