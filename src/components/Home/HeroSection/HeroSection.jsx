import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
                <div>
                    <small>Your Perfect Ride Awaits!</small>
                    <h1>Drive Your Dreams</h1>
                    <small>Seamless, Reliable, and Tailored Car Rentals for Every Journey.</small>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    <Link to={'/cars'} className="btn-get-started scrollto">Get Started</Link>
                    <Link to={'/track-deal'} className="btn-get-started scrollto">Track Great Deal</Link>
                </div>
            </div>
        </section>
    )
}
export default HeroSection;