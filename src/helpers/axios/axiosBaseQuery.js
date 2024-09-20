import {instance} from './axiosInstance';

export const axiosBaseQuery =
    ({baseUrl} = {baseUrl: ''}) =>
        async (data) => {
            console.log("axiosBaseQuery data data", data);

            var {url, method, body, params, headers} = data;
            console.log("axiosBaseQuery data", body);

            try {
                const result = await instance({
                    url: baseUrl + url,
                    method,
                    data: body,
                    params,
                    headers: headers
                })
                console.log("result", result);

                return result
            } catch (axiosError) {
                const err = axiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }