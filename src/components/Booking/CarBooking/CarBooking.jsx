import React, {useEffect, useState} from 'react'
import Footer from '../../Shared/Footer/Footer'
import img from '../../../images/doc/doctor 3.jpg'
import './index.css';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card, Col, Empty, message, Row} from 'antd';
import moment from 'moment';
import VerifyReverse from '../VerifyReverse';
import {useDispatch} from 'react-redux';
import {addInvoice} from '../../../redux/feature/invoiceSlice';
import Header from '../../Shared/Header/Header';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import {
    useCreateReserveMutation,
    useGetCarByIdQuery,
    useGetCheckCarAvailableByIdMutation
} from "../../../redux/api/carApi";

const CarBooking = () => {
    const dispatch = useDispatch();
    const {data: loginInfo} = useAuthCheck();
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
    const {authChecked} = useAuthCheck();
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDay] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const {carId} = useParams();
    const navigation = useNavigate();
    const {data, isLoading, isError, error} = useGetCarByIdQuery(carId);
    const [createReserve, {
        data: createReserveData,
        isSuccess: postReserveIsSuccess,
        isLoading: postReserveIsLoading,
        error: postReserveError
    }] = useCreateReserveMutation();

    const [checkCarAvailability, {data: getCheckCarAvailableByIdData}] = useGetCheckCarAvailableByIdMutation();
    const handleCheckAvailability = () => {
        checkCarAvailability({
            carId: carId,                  // The car ID to check
            selectedFromDate: selectedFromDate,  // The start date
            selectedToDate: selectedToDate       // The end date
        });
    };

    const handleReserve = async () => {
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

    useEffect(() => {
        if (postReserveIsSuccess) {
            message.success("Successfully create reverse")
            setSelectValue(initialValue);
            dispatch(addInvoice({...createReserveData}))
            navigation(`/booking/success/${createReserveData.id}`)
        }
        if (postReserveError) {
            message.error(error?.data?.message);
        }
    }, [postReserveIsSuccess, postReserveError])


    const handleDateChange = async (dates) => {
        setSelectedFromDate(dates[0].format('YYYY-MM-DD').toLowerCase());
        setSelectedToDay(dates[1].format('YYYY-MM-DD').toLowerCase());
        setIsAvailable(false);
    }

    const checkAvailable = () => {
        if (!authChecked) {
            message.error("You need to login first!")
            return;
        }
        if (!selectedFromDate || !selectedToDate) {
            message.error("You need to select Date Range first!")
            return;
        }
        handleCheckAvailability();
        if (getCheckCarAvailableByIdData) {
            message.success("Available");
        } else {
            message.error("Not available");
        }
        setIsAvailable(getCheckCarAvailableByIdData);
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