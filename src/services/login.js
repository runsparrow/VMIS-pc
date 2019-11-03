import request from '@/utils/request';
import { APIHOSTNAME } from '../constants/API'

export async function fakeAccountLogin(params) {
  const { userName, password } = params
  const formData = new FormData();
  formData.append("AccountName", userName)
  formData.append("AccountPwd", password)
  return request(`${APIHOSTNAME}/ERP/Auth/GetToken`, {
    method: 'POST',
    body: formData
  });
}
