import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'
import { stringify } from 'qs';

export async function getcustomerlist() {
  return request(`${APIHOSTNAME}/ERP/CRM/Customer/Read/Rows`, {
    method: 'POST',
  });
}

export async function addcustomer(param) {
  return request(`${APIHOSTNAME}/ERP/CRM/Customer/Create?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function getcustomer(param) {
  return request(`${APIHOSTNAME}/ERP/CRM/Customer/Read/Row?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function updatecustomer(param) {
  return request(`${APIHOSTNAME}/ERP/CRM/Customer/Update?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}

export async function delcustomer(param) {
  return request(`${APIHOSTNAME}/ERP/CRM/Customer/Delete?${stringify(param, { allowDots: true})}`, {
    method: 'POST'
  });
}