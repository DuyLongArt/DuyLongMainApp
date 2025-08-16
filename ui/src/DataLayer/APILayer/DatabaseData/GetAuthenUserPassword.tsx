import axios, { AxiosResponse } from 'axios';
export const getAuthenUserPassword:AxiosResponse=async ()=>axios.get("/main/person/api/1");