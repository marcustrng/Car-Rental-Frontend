import React, {useEffect, useState} from 'react';
import {FaEnvelope, FaLock} from 'react-icons/fa';
import {useForm} from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import {useNavigate} from 'react-router-dom';
import {Toast} from 'react-bootstrap';
import {useUserLoginMutation} from '../../redux/api/authApi';
import {message, notification} from 'antd';

const SignIn = ({handleResponse}) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [infoError, setInfoError] = useState('');
    const [show, setShow] = useState(true);
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [userLogin, {isError, isLoading, isSuccess, error}] = useUserLoginMutation();
    const [forgotEmail, setForgotEmail] = useState('');
    setTimeout(() => {
        setShow(false);
    }, 10000);

    const onSubmit = async ({username, password}) => {
        // userLogin({ ...event })
        try {
            const result = await userLogin({username, password}).unwrap();

            notification.success({message: 'Login successful!', description: `Welcome, ${result.username}!`});
        } catch (err) {
            // Handle error if the login fails
            notification.error({message: 'Login failed', description: error?.data?.message || err.message});
        }

    }

    useEffect(() => {
        if (isError) {
            message.error(error?.data?.message)
            setInfoError(error?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Logged in');
            navigate('/')
        }
    }, [isError, error, isSuccess, navigate])

    const handleShowForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    }

    return (
        <>
            {
                showForgotPassword
                    ?
                    <form className="sign-in-form">
                        <h2 className="title">Forgot Password</h2>
                        <div>To Forgot Your Password Please Enter your email</div>
                        <div className="input-field">
                            <span className="fIcon"><FaEnvelope/></span>
                            <input value={forgotEmail !== undefined && forgotEmail}
                                   onChange={(e) => setForgotEmail(e.target.value)} placeholder="Enter Your Email"
                                   type="email" required/>
                        </div>
                        <div onClick={handleShowForgotPassword} className='text-bold'
                             style={{cursor: "pointer", color: '#4C25F5'}}>Stil Remember Password ?
                        </div>
                        <button className="iBtn" type="submit" value="sign In">
                            Submit
                        </button>
                    </form>
                    :
                    <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                        <Toast show={show} onClose={() => setShow(!show)} className="signInToast">
                            <Toast.Header>
                                <strong className="mr-auto">Demo credential</strong>
                            </Toast.Header>
                            <Toast.Body>Use this account to sign in as a doctor <br/>
                                <hr/>
                                <div className='bg-dark text-white p-2 px-3 rounded'>
                                    email : admin@gmail.com <br/>
                                    password : 123456 <br/>
                                </div>
                                <hr/>
                                <div className='bg-primary p-2 rounded text-white'>
                                    Please do not abuse the facility
                                </div>
                            </Toast.Body>
                        </Toast>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <span className="fIcon"><FaEnvelope/></span>
                            <input {...register("username", {required: true})} placeholder="Enter Your Email"
                                   type="text"/>
                        </div>
                        {errors.email && <span className="text-danger">This field is required</span>}
                        <div className="input-field">
                            <span className="fIcon"><FaLock/></span>
                            <input {...register("password", {required: true})} type="password"
                                   placeholder="Enter Your Password"/>
                        </div>
                        {errors.password && <span className="text-danger">This field is required</span>}
                        {infoError && <p className="text-danger">{infoError}</p>}
                        <div onClick={handleShowForgotPassword} className='text-bold'
                             style={{cursor: "pointer", color: '#4C25F5'}}>Forgot Password ?
                        </div>
                        <button className="iBtn" type="submit" value="sign In">
                            {isLoading ? <Spinner animation="border" variant="info"/> : "Sign In"}
                        </button>
                        <p className="social-text">Or Sign in with social platforms</p>
                        {/*<SocialSignUp handleResponse={handleResponse} />*/}
                    </form>
            }
        </>
    );
};

export default SignIn;