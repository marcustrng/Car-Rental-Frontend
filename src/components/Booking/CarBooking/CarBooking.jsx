import React, {useEffect, useState} from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Col, Empty, message, Row, Steps} from 'antd';
import {FaArchway} from "react-icons/fa";
import moment from 'moment';
import VerifyReverse from '../VerifyReverse';
import PersonalInformation from '../PersonalInformation';
import CheckoutPage from '../BookingCheckout/CheckoutPage';
import {useCreateAppointmentMutation} from '../../../redux/api/appointmentApi';
import {useDispatch} from 'react-redux';
import {addInvoice} from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import {useGetCarByIdQuery} from "../../../redux/api/carApi";
import {useGetAppointmentTimeQuery} from "../../../redux/api/timeSlotApi";

const CarBooking = () => {
    const dispatch = useDispatch();
    let initialValue = {
        paymentMethod: 'paypal',
        paymentType: 'creditCard',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        reasonForVisit: '',
        description: '',
        address: '',
        nameOnCard: '',
        cardNumber: '',
        expiredMonth: '',
        cardExpiredYear: '',
        cvv: '',
    }
    const {data: loggedInUser, role} = useAuthCheck();
    const [current, setCurrent] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectDay, setSelectDay] = useState('');
    const [selectTime, setSelectTime] = useState('');
    const [isCheck, setIsChecked] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [createAppointment, {
        data: appointmentData,
        isSuccess: createIsSuccess,
        isError: createIsError,
        error: createError,
        isLoading: createIsLoading
    }] = useCreateAppointmentMutation();
    const {carId, startDate, endDate} = useParams();
    console.log("carId", carId);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    const navigation = useNavigate();
    const { data, isLoading, isError, error } = useGetCarByIdQuery(carId);
    const { data: time, refetch, isLoading: dIsLoading, isError: dIsError, error: dError } = useGetAppointmentTimeQuery({ day: selectDay, id: carId });

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = (e) => { setSelectValue({ ...selectValue, [e.target.name]: e.target.value }) }

    useEffect(() => {
        const { firstName, lastName, email, phone, nameOnCard, cardNumber, expiredMonth, cardExpiredYear, cvv, reasonForVisit } = selectValue;
        const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
        const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
        setIsDisable(isInputEmpty);
        setIsConfirmDisable(isConfirmInputEmpty);
    }, [selectValue, isCheck])


    const handleDateChange = (_date, dateString) => {
        setSelectedDate(dateString)
        setSelectDay(moment(dateString).format('dddd').toLowerCase());
        refetch();
    }

    const next = () => { setCurrent(current + 1) };
    const prev = () => { setCurrent(current - 1) };

    let dContent = null;
    if (isLoading) dContent = <div>Loading ...</div>
    if (!isLoading && isError) dContent = <div>Something went Wrong!</div>
    if (!isLoading && !isError && data.length === 0) dContent = <Empty children="Car Is not Available" />
    if (!isLoading && !isError && data.length > 0) dContent =
        <>
            <h2 style={{color: '#05335c'}}>Verify Your Information</h2>
            <div style={{marginBottom: '1.5rem'}}>
                <h5>Selected Date Range:</h5>
                <p>{`${moment().format('YYYY-MM-DD')} - ${moment().format('YYYY-MM-DD')}`}</p>
            </div>
        </>

    //What to render
    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong!</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty/>
    if (!isLoading && !isError && data?.id) content =
        <>
            <h2 style={{color: '#05335c'}}>Your Choose</h2>
            <Card style={{borderRadius: '8px'}}>
                <Row gutter={16}>
                    <Col span={8}>
                        <img
                            src={data.imageUrl}
                            alt={`${data.brand} ${data.model}`}
                            style={{width: '100%', borderRadius: '8px'}}
                        />
                    </Col>
                    <Col span={16}>
                        <h4>{`${data.brand} ${data.model}`}</h4>
                        <p><strong>Year:</strong> {data.year}</p>
                        <p><strong>Description:</strong> {data.description}</p>
                        <p><strong>Seats:</strong> {data.seats}</p>
                        <p><strong>Trunk Capacity:</strong> {data.trunkCapacity} L</p>
                        <p><strong>Price per Day:</strong> ${data.pricePerDay.toFixed(2)}</p>
                        <p><strong>Available:</strong> {data.rented ? 'No' : 'Yes'}</p>
                    </Col>
                </Row>
            </Card>
        </>

    const steps = [
        {
            title: 'Verify Reverse',
            content: <VerifyReverse
                content={content}
                dContent={dContent}
                handleDateChange={handleDateChange}
            />
        },
        {
            title: 'Patient Information',
            content: <PersonalInformation handleChange={handleChange} selectValue={selectValue} setPatientId={setPatientId}/>
        },
        {
            title: 'Payment',
            content: <CheckoutPage
                handleChange={handleChange}
                selectValue={selectValue}
                isCheck={isCheck}
                setIsChecked={setIsChecked}
                data={data}
                selectedDate={selectedDate}
                selectTime={selectTime}
            />,
        },
    ]

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    const handleConfirmSchedule = () => {
        const obj = {};
        obj.patientInfo = {
            firstName: selectValue.firstName,
            lastName: selectValue.lastName,
            email: selectValue.email,
            phone: selectValue.phone,
            scheduleDate: selectedDate,
            scheduleTime: selectTime,
            doctorId: carId,
            patientId: role !== '' && role === 'patient' ? patientId : undefined,
        }
        obj.payment = {
            paymentType: selectValue.paymentType,
            paymentMethod: selectValue.paymentMethod,
            cardNumber: selectValue.cardNumber,
            cardExpiredYear: selectValue.cardExpiredYear,
            cvv: selectValue.cvv,
            expiredMonth: selectValue.expiredMonth,
            nameOnCard: selectValue.nameOnCard
        }
        createAppointment(obj);
    }

    useEffect(() => {
        if (createIsSuccess) {
            message.success("Succcessfully Appointment Scheduled")
            setSelectValue(initialValue);
            dispatch(addInvoice({ ...appointmentData }))
            navigation(`/booking/success/${appointmentData.id}`)
        }
        if (createIsError) {
            message.error(error?.data?.message);
        }
    }, [createIsSuccess, createError])
    return (
        <>
            <Header />
            <div className="container" style={{ marginBottom: '12rem', marginTop: '8rem' }}>
                <Steps current={current} items={items} />
                <div className='mb-5 mt-3 mx-3'>{steps[current].content}</div>
                <div className='text-end mx-3' >
                    {current < steps.length - 1 && (<Button type="primary"
                        disabled={current === 0 ? (selectTime ? false : true) : IsdDisable || !selectTime}
                        onClick={() => next()}>Next</Button>)}

                    {current === steps.length - 1 && (<Button type="primary" disabled={IsConfirmDisable} loading={createIsLoading} onClick={handleConfirmSchedule}>Confirm</Button>)}
                    {current > 0 && (<Button style={{ margin: '0 8px', }} onClick={() => prev()} >Previous</Button>)}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CarBooking