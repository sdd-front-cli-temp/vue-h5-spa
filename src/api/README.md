import axios from '@/libs/api.request';
import { getQsData } from '@/libs/util';


// eslint-disable-next-line import/prefer-default-export
export const getRandomCap = (data) => axios.request({
  url: 'sys/randomCaptchaCode',
  method: 'get',
  params: data,
  responseType: 'blob'
});

export const loginByPwd = (data) => axios.request({
  url: 'api/v1/loginByPass',
  method: 'get',
  params: data
});

export const loginBySms = (data) => axios.request({
  url: 'api/v1/saveUser',
  method: 'post',
  data
});

export const sendCode = (data) => axios.request({
  url: 'sms/newSendCode',
  method: 'post',
  data: getQsData(data)
});
