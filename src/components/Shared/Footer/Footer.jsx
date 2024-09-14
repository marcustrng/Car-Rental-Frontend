import React from 'react';
import './Footer.css';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="footer position-relative">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img src={logo} alt="logo" style={{ maxWidth: '160px' }} />
									</Link>
								</div>
								<div className="footer-about-content">
									<p className='form-text' style={{ maxWidth: 200 }}>
										Discover our commitment to providing top-notch car rental services. With a focus on quality and customer satisfaction, we ensure a seamless experience for every journey. Explore our diverse fleet and let us drive your adventures.
									</p>								</div>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Customers</h2>
								<ul>
									<li><Link to={'/cars'}><FaAngleDoubleRight className='icon' />  Search for Cars</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Login</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Register</Link></li>
									<li><Link to={'/cars'}><FaAngleDoubleRight className='icon' />  Renting</Link></li>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' />  Customer Dashboard</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">

							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Admin</h2>
								<ul>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' /> Appointments</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> Login</Link></li>
									<li><Link to={'/register'}><FaAngleDoubleRight className='icon' /> Register</Link></li>
									<li><Link to={'/dashboard'}><FaAngleDoubleRight className='icon' /> Admin Dashboard</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title mt-3 mt-md-0">Contact Us</h2>
								<div className="footer-contact-info">
									<div className="footer-address">
										<span><i className="fas fa-map-marker-alt"></i></span>
										<p> 02 Võ Oanh, Phường 25, Bình Thạnh, <br /> Hồ Chí Minh, Vietnam </p>
									</div>
									<p>
										<i className="fas fa-phone-alt"></i>
										(+84) 981 875 370
									</p>
									<p className="mb-0">
										<i className="fas fa-envelope"></i>
										2231123101@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;