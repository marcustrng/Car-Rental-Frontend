import React, { useEffect } from 'react'
import Footer from '../Shared/Footer/Footer'
import { useForm } from 'react-hook-form';
import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Header from '../Shared/Header/Header';
import './index.css';
import SubHeader from '../Shared/SubHeader';
import { useContactMutation } from '../../redux/api/contactApi';
import { message } from 'antd';

const Contact = () => {
    const [contact, {isLoading, isError, error, isSuccess}]= useContactMutation();
    const { register, handleSubmit, reset } = useForm({});
    const onSubmit = (data) => {
        contact(data);
        reset();
    };
    
    useEffect(() => {
        if(isSuccess){
            message.success("Successfully Message Send !");
        }
        if(isError && error){
            message.error(error?.data?.message);
        }
    }, [isSuccess, isError, error])
    return (
        <>
            <Header />
            <SubHeader title="Contact us" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />
            <section id="contact" className="contact mt-5 mb-5">
                <div className="container" style={{ marginTop: 80, marginBottom: 120 }}>
                    <div className="row">

                        <div className="col-lg-4">
                            <div className="info rounded p-3" style={{ background: '#f8f9fa' }}>
                                <div className="d-flex mb-2 gap-2">
                                    <FaLocationArrow className='icon' />
                                    <div>
                                        <h4>Location:</h4>
                                        <p>02 Võ Oanh, Phường 25, Bình Thạnh, Hồ Chí Minh, Vietnam</p>
                                    </div>
                                </div>

                                <div className="d-flex mb-2 gap-2">
                                    <FaEnvelope className='icon' />
                                    <div>
                                        <h4>Email:</h4>
                                        <p>2231123101@ut.edu.vn</p>
                                    </div>
                                </div>

                                <div className="d-flex mb-2 gap-2">
                                    <FaPhoneAlt className='icon' />
                                    <div>
                                        <h4>Call:</h4>
                                        <p>(+84)981 875 370</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-8">
                            <div className="mb-5 p-2 rounded" style={{ background: '#f8f9fa' }}>
                                <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>First Name</label>
                                            <input required {...register("firstName")} className="form-control" placeholder='First Name'/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Last Name</label>
                                            <input required {...register("lastName")} className="form-control" placeholder='Last Name'/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Email</label>
                                            <input required {...register("email")} type='email' className="form-control" placeholder="Email" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Subject</label>
                                            <input required {...register("subject")} className="form-control" placeholder="Enter your subject"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className='form-label'>Message</label>
                                            <textarea required {...register("text")} className="form-control mb-3" cols="30" rows="10" placeholder="enter your message"/>
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 mb-5">
                                        <button disabled={isLoading} type='submit' className="appointment-btn">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        {/* eslint-disable-next-line */}
                        <iframe
                            style={{border: 0, width: "100%", height: "350px"}}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0862425835767!2d106.71438187590611!3d10.80470655866972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2sHo%20Chi%20Minh%20City%20University%20of%20Transport!5e0!3m2!1sen!2s!4v1726325473728!5m2!1sen!2s"
                            frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Contact