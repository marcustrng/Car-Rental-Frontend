import React from 'react'
import SubHeader from '../Shared/SubHeader'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'
import {Link} from 'react-router-dom'
import carBg from '../../images/img/car-bg.png';
import img1 from '../../images/services/short-term-rentals.jpg'
import img2 from "../../images/services/long-term-rentals.jpg";
import img3 from "../../images/services/luxury-rentals.jpg";
import img4 from "../../images/services/suvs-vans.jpg";
import img5 from "../../images/services/compact-economy-cars.jpg";

const Service = () => {
  const weArePleaseStyle = {
    backgroundColor: "antiquewhite",
    height: "60vh",
    background: `url(${carBg}) no-repeat`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: "10px",
    position: "relative",
    marginTop: 200,
    marginBottom: 100
  }
  const availableServiceArray = [
    {
      title: 'Short-Term Rentals',
      img: img1,
      desc: "Perfect for quick getaways or business trips, our short-term rentals offer flexibility and convenience for your immediate needs."
    },
    {
      title: 'Long-Term Rentals',
      img: img2,
      desc: "Ideal for extended stays, our long-term rentals provide comfort and reliability for both personal and professional use."
    },
    {
      title: 'Luxury Rentals',
      img: img3,
      desc: "Experience the height of sophistication with our luxury rentals, featuring top-of-the-line amenities and premium comfort."
    },
    {
      title: 'SUVs and Vans',
      img: img4,
      desc: "For larger groups or adventurous trips, our SUVs and vans deliver space, versatility, and rugged performance."
    },
    {
      title: 'Compact and Economy Cars',
      img: img5,
      desc: "Efficient and easy to maneuver, our compact and economy cars are perfect for city driving and budget-conscious travelers."
    },
  ];
  return (
      <>
        <Header/>
        <SubHeader title="Service"
                   subtitle="Tailored solutions for all your travel needs."/>

        <div className="container" style={{marginTop: 200, marginBottom: 100}}>
          <div className="row">
            {availableServiceArray.map((service, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                  <div className="card shadow border-0 mb-5">
                    <img
                        src={service.img}
                        alt={service.title}
                        className="img-fluid"
                        style={{maxHeight: '17rem', objectFit: 'cover'}}
                    />
                    <div className="p-2">
                      <h4 className="mt-4 mb-2">{service.title}</h4>
                      <p className="mb-4">{service.desc}</p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>

        <section style={weArePleaseStyle}>
          <div className="container" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <div className="row">
              <div className="col-lg-7">
                <div className="d-flex align-items-center">
                  <div className='mb-4 section-title text-center'>
                    <h2 className='text-uppercase'>We are pleased to offer
                      you</h2>
                    <Link to={'/cars'} className="btn-get-started scrollto">Get
                      Started</Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>


        <Footer/>
      </>
  )
}

export default Service