import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';
import {FaDollarSign} from "react-icons/fa";

const SearchContent = ({data}) => {
    return (
        <div className="mb-4 rounded" style={{background: '#f3f3f3'}}>
            <div className='d-flex p-3 justify-content-between'>
                <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        {data?.imageUrl && <img src={data?.imageUrl} className="" alt="User Image"/>}
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'><Link
                            to={`/cars/${data?.id}`}>{data?.brand + ' ' + data?.model}</Link></h5>
                        <p className='m-0 form-text p-lg-2'>{data?.description}</p>
                        <br/>
                        <div className="clinic-details">
                            <p className="form-text text-secondary"><FaDollarSign/> {data?.pricePerDay} a day</p>
                        </div>
                    </div>
                </div>
                <div className="doc-info-right me-3">
                    <div className="clinic-booking">
                        <Link to={`/cars/${data?.id}`} className="view-pro-btn">View Profile</Link>
                        <Link to={`/booking/${data?.id}`} className="apt-btn">Book Car</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchContent