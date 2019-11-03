import request from '@/utils/request';
import { APIHOSTNAME } from '../../../constants/API'
import { stringify } from 'qs';

export async function getsitelist() {
  return request(`${APIHOSTNAME}/ERP/SRM/Site/Read/Rows`, {
    method: 'POST',
  });
}

export async function getvenuelist(param) {
  return request(`${APIHOSTNAME}/ERP/SRM/Venue/Read/Rows?${stringify(param, { allowDots: true })}`, {
    method: 'POST',
  });
}