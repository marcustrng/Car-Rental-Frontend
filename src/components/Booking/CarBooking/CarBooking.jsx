import React, {useEffect, useState} from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Col, Empty, message, Row, Steps} from 'antd';
import moment from 'moment';
import VerifyReverse from '../VerifyReverse';
import PersonalInformation from '../PersonalInformation';
import CheckoutPage from '../BookingCheckout/CheckoutPage';
import {useCreateAppointmentMutation} from '../../../redux/api/appointmentApi';
import {useDispatch} from 'react-redux';
import {addInvoice} from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import {
    useGetCarByIdQuery,
    useGetCheckCarAvailableByIdQuery,
    usePostReserveByIdMutation
} from "../../../redux/api/carApi";

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
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectToDay] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [isCheck, setIsChecked] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [isMakeAReverse, setIsMakeAReverse] = useState(false);
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
    const {data, isLoading, isError, error} = useGetCarByIdQuery(carId);
    if (isMakeAReverse) {
        const {data: postReserveData} = usePostReserveByIdMutation(carId);
    }
    console.log(" 1selectedFromDate", selectedFromDate);
    console.log(" 1selectedToDate", selectedToDate);
    console.log(" carId,", carId);
    const {
        data: getCheckCarAvailableByIdData,
    } = useGetCheckCarAvailableByIdQuery({
        carId,
        selectedFromDate,
        selectedToDate
    });

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = (e) => {
        setSelectValue({...selectValue, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const {
            firstName,
            lastName,
            email,
            phone,
            nameOnCard,
            cardNumber,
            expiredMonth,
            cardExpiredYear,
            cvv,
            reasonForVisit
        } = selectValue;
        const isInputEmpty = !firstName || !lastName || !email || !phone || !reasonForVisit;
        const isConfirmInputEmpty = !nameOnCard || !cardNumber || !expiredMonth || !cardExpiredYear || !cvv || !isCheck;
        setIsDisable(isInputEmpty);
        setIsConfirmDisable(isConfirmInputEmpty);
    }, [selectValue, isCheck])


    const handleDateChange = (dates) => {
        setSelectedFromDate(dates[0].format('YYYY-MM-DD').toLowerCase());
        setSelectToDay(dates[1].format('YYYY-MM-DD').toLowerCase());
        setIsAvailable(false);
    }

    const checkAvailable = () => {
        if (!selectedFromDate || !selectedToDate) {
            message.error("You need to select Date Range first!")
            return;
        }
        if (getCheckCarAvailableByIdData) {
            message.success("Available");
        } else {
            message.error("Not available");
        }
        setIsAvailable(getCheckCarAvailableByIdData);
        console.log("isAvailable", isAvailable);
    };

    const makeAReverse = () => {
        setIsMakeAReverse(true);
    };

    const next = () => {
        setCurrent(current + 1)
    };
    const prev = () => {
        setCurrent(current - 1)
    };

    let dContent = null;
    if (isLoading) dContent = <div>Loading ...</div>
    if (!isLoading && isError) dContent = <div>Something went Wrong!</div>
    if (!isLoading && !isError && data.length === 0) dContent = <Empty children="Car Is not Available"/>
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
            title: 'Customer Information',
            content: <PersonalInformation handleChange={handleChange} selectValue={selectValue}
                                          setPatientId={setPatientId}/>
        },
        {
            title: 'Payment',
            content: <CheckoutPage
                handleChange={handleChange}
                selectValue={selectValue}
                isCheck={isCheck}
                setIsChecked={setIsChecked}
                data={data}
                // selectedDate={selectedDate}
                // selectTime={selectTime}
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
            // scheduleDate: selectedDate,
            // scheduleTime: selectTime,
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
            dispatch(addInvoice({...appointmentData}))
            navigation(`/booking/success/${appointmentData.id}`)
        }
        if (createIsError) {
            message.error(error?.data?.message);
        }
    }, [createIsSuccess, createError])
    return (
        <>
            <Header/>
            <div className="container" style={{marginBottom: '12rem', marginTop: '8rem'}}>
                <VerifyReverse
                    content={content}
                    dContent={dContent}
                    handleDateChange={handleDateChange}
                />
                <div className='text-end mx-3'>
                    <Button type="primary" className='mb-5 mt-3 mx-3'
                            disabled={isAvailable}
                            onClick={() => checkAvailable()}
                    >Check Available</Button>
                    <Button type="primary"
                            disabled={!isAvailable}
                            onClick={() => makeAReverse()}>Make Reverse</Button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CarBooking