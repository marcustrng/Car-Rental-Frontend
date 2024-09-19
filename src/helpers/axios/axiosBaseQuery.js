import { instance } from './axiosInstance';

export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, body, params, headers }) => {
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