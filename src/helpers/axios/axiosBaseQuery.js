import { instance } from './axiosInstance';

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers }) => {
            console.log("axiosBaseQuery data", data);

            try {
                const result = await instance({
                    url: baseUrl + url,
                    method,
                    data,
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