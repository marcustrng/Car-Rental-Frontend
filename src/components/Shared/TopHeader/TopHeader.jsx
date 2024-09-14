import React from 'react';
import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaGithubSquare, FaPhoneAlt, FaEnvelope  } from "react-icons/fa";

const TopHeader = () => {
    return (
        <div id="topbar" className="d-flex align-items-center fixed-top">
            <div className="container d-flex justify-content-between">
                <div className="contact-info d-flex align-items-center">
                    <FaEnvelope className='contact-icon'/> <a href="mailto:ujjalzaman@example.com">2231123101@gmail.com</a>
                    <FaPhoneAlt className='contact-icon'/> <a href="tel:(+84) 981 875 370">(+84) 981 875 370</a>
                </div>
                <div className="d-none d-lg-flex social-links align-items-center">
                    <a href="https://www.linkedin.com/in/tutqq" target='_blank' rel="noreferrer" className="linkedin"><FaLinkedin /></a>
                    <a href="https://www.facebook.com/tutqq96" target='_blank' rel="noreferrer" className="facebook"><FaFacebookSquare /></a>
                    <a href="https://github.com/marcustrng" target='_blank' rel="noreferrer" className=""><FaGithubSquare /></a>
                </div>
            </div>
        </div>
    );
};
export default TopHeader;