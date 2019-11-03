import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'
import { stringify } from 'qs';

export async function getuserlist() {
  return request(`${APIHOSTNAME}/ERP/AVM/User/Read/Rows`, {
    method: 'POST',
  });
}

export async function adduser(param) {
  return request(`${APIHOSTNAME}/ERP/AVM/User/Create?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function getuser(param) {
  return request(`${APIHOSTNAME}/ERP/AVM/User/Read/Row?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function updateuser(param) {
  return request(`${APIHOSTNAME}/ERP/AVM/User/Update?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function deluser(param) {
  return request(`${APIHOSTNAME}/ERP/AVM/User/Delete?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}