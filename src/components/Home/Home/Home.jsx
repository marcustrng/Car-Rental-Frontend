import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import RentCar from '../RentCar/RentCar';
import Available from '../AvailableFeatures/Available';
import HeroSection from '../HeroSection/HeroSection';
import InfoPage from '../InfoPage/InfoPage';
import Header from '../../Shared/Header/Header';
import Service from '../Services/Service';
import Gallery from '../Gallery/Gallery';
import OurCars from "../OurCar/OurCars";

const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <InfoPage />
            <Service />
            <RentCar />
            <Available />
            <OurCars/>
            <Gallery/>
            <Footer />
        </>
    );
};

export default Home;