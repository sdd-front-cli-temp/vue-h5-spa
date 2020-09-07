import AxiosReq from './axios';
// import config from '@/config';
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

const http = new AxiosReq('/apiReq');
export default http;
