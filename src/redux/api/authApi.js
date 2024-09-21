import { setUserInfo } from "../../utils/local-storage";
import { baseApi } from "./baseApi"

const AUTH_URL = '/auth'

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (loginData) => {
                // Log the login data being sent
                return {
                    url: `/login`,
                    method: 'POST',
                    body: loginData, // Use 'body' instead of 'data' for fetch
                };
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = (await queryFulfilled).data;
                    setUserInfo({ accessToken: result.Authorization, username: arg.username });
                } catch (error) {
                }
            },
        }),
        patientSignUp: build.mutation({
            query: (data) => ({
                url: `/patient`,
                method: 'POST',
                data,
            }),
        }),
        doctorSignUp: build.mutation({
            query: (data) => ({
                url: `/doctor`,
                method: 'POST',
                data,
            }),
        }),
        resetPassword: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password`,
                method: 'POST',
                data,
            }),
        }),
        resetConfirm: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/reset-password/confirm`,
                method: 'POST',
                data,
            }),
        }),
    })
})

export const { 
    useUserLoginMutation, 
    useDoctorSignUpMutation, 
    usePatientSignUpMutation,
    useResetPasswordMutation, 
    useResetConfirmMutation
} = authApi