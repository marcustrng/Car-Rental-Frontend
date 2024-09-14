import React from 'react';
import './index.css';
import img from '../../../images/services/short-term-rentals.jpg'
import img2 from '../../../images/services/luxury-rentals.jpg'
import img3 from '../../../images/services/suvs-vans.jpg'
import {Link} from 'react-router-dom';

const Service = () => {
  return (<section className="container"
                   style={{marginTop: 200, marginBottom: 200}}>
        <div className='mb-5 section-title text-center'>
          <h2>Services</h2>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-sm-6">
              <div className="service-img">
                <img src={img} alt="" className="img-fluid"/>
                <img src={img2} alt="" className="img-fluid mt-4"/>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="service-img mt-4 mt-lg-0">
                <img src={img3} alt="" className="img-fluid"/>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service-content ps-4 mt-4 mt-lg-0">
                <h2>Reliable Rentals,<br/>Anytime, Anywhere</h2>
                <p className="mt-4 mb-5 text-secondary form-text">Reliable
                  Rentals offers a wide range of well-maintained vehicles for
                  every journey. With our easy booking system and 24/7 support,
                  you can trust us for a smooth and dependable rental
                  experience. Wherever you’re headed, we’re here to get you
                  there.</p>
                <Link to={'/service'}
                      className="btn-get-started scrollto">Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>)
}

export default Service