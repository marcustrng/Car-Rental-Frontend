import axios from "axios";
import {getFromLocalStorage} from "../../utils/local-storage";

export const instance = axios.create();

instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(function (config) {
    const accessToken = getFromLocalStorage('accessToken');
    if (accessToken) {
        config.headers.Authorization = accessToken;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    console.log("response", response);
    return {
        data: response?.data?.content,
        meta: response?.data?.meta,
        content: response?.data?.content,
    };
}, function (error) {
    return Promise.reject(error);
});