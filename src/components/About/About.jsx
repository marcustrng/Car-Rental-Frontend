import React from 'react'
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/achievements-1.png'
import img from '../../images/logo.png'
import SubHeader from '../Shared/SubHeader';
import {Empty} from 'antd';
import {useGetCarsQuery} from "../../redux/api/carApi";

const About = () => {
    const {data: carData, isLoading: isLoading, isError: isError} = useGetCarsQuery({size: 4});

    const cars = carData?.cars;

    let aboutContent = null;
    if (!isLoading && isError) aboutContent = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && cars?.length === 0) aboutContent = <div><Empty/></div>
    if (!isLoading && !isError && cars?.length > 0) aboutContent =
        <>
            {cars && cars.map((item, id) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
                    <div className="card shadow border-0 mb-5 mb-lg-0">
                        {item.imageUrl &&
                            <img src={item.imageUrl} class="img-fluid w-100" alt="" style={{height: '180px'}}/>}
                        <div className="p-2">
                            <h4 className="mt-4 mb-0" style={{color: '#223a66'}}>
                                <a>{item?.brand + ' ' + item?.model}</a></h4>
                            <p style={{height: '200px'}}>{item?.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>

    return (
        <>
            <Header/>
            <SubHeader
                title="About Us"
                subtitle="Learn more about our mission, values, and the dedicated team behind our exceptional car rental services."
            />
            <div className="container" style={{marginBottom: 100, marginTop: 100}}>
                <div className="row p-5">
                    <div className="col-lg-4">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>Our Achievements</h2>
                            <p className='form-text m-0'>Celebrating milestones
                                and excellence in our journey.</p>
                        </div>
                        <p className='mt-3'>
                            Discover how we’ve made an impact in the industry
                            through dedication and hard work. From reaching key
                            milestones to delivering outstanding results, our
                            achievements reflect our commitment to excellence
                            and customer satisfaction.
                        </p>
                    </div>
                    <div className="col-lg-8">
                        <img src={ImageHeading} alt=""
                             className="img-fluid rounded shadow"/>
                    </div>
                </div>
            </div>

            <div className="container" style={{marginBottom: 100, marginTop: 100}}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>Meet Our Specialist</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                                ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {aboutContent}
                </div>
            </div>

            <div className="container say-about" style={{marginBottom: 100, marginTop: 100}}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className='mb-4 section-title text-center'>
                            <h2 className='text-uppercase'>What Customer's Say</h2>
                            <p className='form-text m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                                ipsum!</p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="my-2">
                            <h4 style={{color: '#223a66'}} className='my-0'>Amazing service!</h4>
                            <span>John Partho</span>
                        </div>
                        <p className='form-text'>
                            They provide great service facilty consectetur adipisicing elit. Itaque rem, praesentium,
                            iure, ipsum magnam deleniti a vel eos adipisci suscipit fugit placeat. Quibusdam laboriosam
                            eveniet nostrum nemo commodi numquam quod.
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About