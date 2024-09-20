import React, {useEffect, useState} from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Col, Empty, message, Row} from 'antd';
import moment from 'moment';
import VerifyReverse from '../VerifyReverse';
import {useCreateAppointmentMutation} from '../../../redux/api/appointmentApi';
import {useDispatch} from 'react-redux';
import {addInvoice} from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import {
    useCreateReserveMutation,
    useGetCarByIdQuery,
    useGetCheckCarAvailableByIdQuery
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
    const {carId, startDate, endDate} = useParams();
    console.log("carId", carId);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    const navigation = useNavigate();
    const {data, isLoading, isError, error} = useGetCarByIdQuery(carId);
    const [createReserve, {
        data: createReserveData,
        isSuccess: postReserveIsSuccess,
        isLoading: postReserveIsLoading,
        error: postReserveError
    }] = useCreateReserveMutation();

    console.log(" 1selectedFromDate", selectedFromDate);
    console.log(" 1selectedToDate", selectedToDate);
    console.log(" carId,", carId);
    const {
        data: getCheckCarAvailableByIdData,
    } = useGetCheckCarAvailableByIdQuery({
        carId,
        selectedFromDate: selectedFromDate,
        selectedToDate: selectedToDate
    });

    const handleReserve = async () => {
        console.log("handleReserve carId", carId);
        console.log("handleReserve selectedFromDate", selectedFromDate);
        console.log("handleReserve selectedToDate", selectedToDate);
        const data = {
            startDate: selectedFromDate,
            endDate: selectedToDate,
            username: 'user01'
        };
        createReserve({
            carId: carId,
            data: data
        })
    };

    const [selectValue, setSelectValue] = useState(initialValue);
    const [IsdDisable, setIsDisable] = useState(true);
    const [IsConfirmDisable, setIsConfirmDisable] = useState(true);

    const handleChange = (e) => {
        setSelectValue({...selectValue, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (postReserveIsSuccess) {
            message.success("Successfully create reverse")
            setSelectValue(initialValue);
            console.log("createReserveData", createReserveData)
            dispatch(addInvoice({...createReserveData}))
            navigation(`/booking/success/${createReserveData.id}`)
        }
        if (postReserveError) {
            message.error(error?.data?.message);
        }
    }, [postReserveIsSuccess, postReserveError])


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
                            onClick={handleReserve}>Make Reverse</Button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CarBooking