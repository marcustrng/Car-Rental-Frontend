import React, {useEffect} from 'react';
import Footer from '../Shared/Footer/Footer';
import {FaAlignLeft, FaCalendarAlt, FaCalendarCheck, FaCar} from "react-icons/fa";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Button, Empty, Tag, Tooltip} from 'antd';
import moment from 'moment';
import Header from '../Shared/Header/Header';
import {clickToCopyClipBoard} from '../../utils/copyClipBoard';
import {useGetRentByIdQuery} from "../../redux/api/rentApi";

const BookingSuccess = () => {
    const {id} = useParams();
    const {data} = useGetRentByIdQuery(id);

    const navigate = useNavigate();

    useEffect(() => {
        const timeOut = setTimeout(() => {
            if (!data?.id) {
                navigate('/');
            }
        }, 5000)
        return () => clearTimeout(timeOut)
    }, [navigate, data])

    return (
        <>
            <Header/>
            <div className="container mx-auto d-flex justify-content-center align-items-center text-center">
                {
                    data?.id ?

                        <div className=" p-3" style={{
                            marginTop: '8rem',
                            marginBottom: '5rem',
                            height: '60vh',
                            background: '#f8f9fa',
                            maxWidth: '400px'
                        }}>

                            <div className='border-bottom my-2'>
                                <FaCalendarCheck style={{fontSize: '2.5rem'}} className='text-success'/>
                                <h6 className='py-2'>Reverse is successful</h6>
                                <p className='text-secondary border rounded-pill form-text text-success border-success'>Check
                                    your Inbox an email with all details!</p>
                            </div>


                            <div>
                                <Tooltip title="Copy Tracking Id">
                                    <Button>
                                        <h6>Tracking<Tag color="#87d068" className='ms-2 text-uppercase'
                                                         onClick={() => clickToCopyClipBoard(data?.id)}>{data?.id}</Tag>
                                        </h6>
                                    </Button>
                                </Tooltip>
                            </div>


                            <div className='card border-0 p-3 rounded mb-5'>
                                <div className='d-flex gap-3 mb-2 align-items-center'>
                                    <FaAlignLeft style={{fontSize: '1rem'}}/>
                                    <Link to={`/dashboard/appointments/${id}`}><h5 className='text-primary'>View
                                        Reverse Details</h5></Link>
                                </div>
                                <div className='d-flex gap-3 mb-1'>
                                    <FaCar style={{fontSize: '1rem'}}/>
                                    <p>{data?.car?.brand} {data?.car?.model}</p>
                                </div>
                                <div className='d-flex gap-3'>
                                    <div><FaCalendarAlt style={{fontSize: '1rem'}}/></div>
                                    <p>{(data.startDate && data.endDate) && moment(data.startDate).format('YYYY-MM-DD') + ' - ' + moment(data.endDate).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='rounded p-3 d-flex flex-column justify-content-center align-items-center'
                             style={{background: "#f8f9fa", marginTop: '8rem', marginBottom: '5rem'}}>
                            <Empty/>
                            <h6 className='p-2 my-3'>You will be redirect to homepage !</h6>
                        </div>
                }
            </div>
            <Footer/>
        </>

    )
}

export default BookingSuccess