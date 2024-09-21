import {instance} from './axiosInstance';

export const axiosBaseQuery =
    ({baseUrl} = {baseUrl: ''}) =>
        async (data) => {
            var {url, method, body, params, headers} = data;

            try {
                const result = await instance({
                    url: baseUrl + url,
                    method,
                    data: body,
                    params,
                    headers: headers
                })

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