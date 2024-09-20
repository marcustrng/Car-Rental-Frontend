import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"

const RENT_URL = '/rents'

export const appointmentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        trackAppointment: build.mutation({
            query: (data) => ({
                url: `${RENT_URL}/tracking`,
                method: 'POST',
                data: data
            })
        }),
    })
})

export const { 
    useGetDoctorAppointmentsQuery,
    useGetPatientAppointmentsQuery,
    useGetDoctorPatientsQuery,
    useCreateAppointmentMutation,
    useGetSingleAppointmentQuery,
    useGetAppointmentedPaymentInfoQuery,
    useGetPatientInvoicesQuery,
    useGetDoctorInvoicesQuery,
    useUpdateAppointmentMutation,
    useCreateAppointmentByUnauthenticateUserMutation, 
    useTrackAppointmentMutation
} = appointmentApi;