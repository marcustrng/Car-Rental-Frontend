import React from 'react';
import {Link} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import {Tag} from 'antd';
import './index.css';
import {FaComment, FaDollarSign, FaRegThumbsUp} from "react-icons/fa";

const SearchContent = ({data, searchDateFrom, searchDateTo}) => {
    const services = data?.services?.split(',')
    return (
        <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
            <div className='d-flex p-3 justify-content-between'>
                <div className='d-flex gap-3'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        { data?.imageUrl && <img src={data?.imageUrl} className="" alt="User Image" />}
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'><Link to={`/doctors/profile/${data?.id}`}>Dr. {data?.brand + ' ' + data?.model}</Link></h5>
                        <p className='m-0 form-text'>{data?.description}</p>
                        <br/>
                        <div className='d-flex align-items-center'>
                            <div>
                                <StarRatings
                                    rating={5}
                                    starRatedColor="#f4c150"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"
                                    starSpacing="2px"
                                />
                            </div>
                            <div>(4)</div>
                        </div>

                        <div className="clinic-details">
                            <p className="form-text text-secondary"><FaDollarSign /> {data?.pricePerDay} a day</p>
                        </div>
                        {
                            services?.map((item, id) => (
                                <Tag key={id + 51}>{item}</Tag>

                            ))
                        }
                    </div>
                </div>
                <div className="doc-info-right me-3">
                    <div className="clini-infos">
                        <ul>
                            <li><FaRegThumbsUp />  97%</li>
                            <li><FaComment /> 4 Feedback</li>
                            {/*<li><FaLocationArrow />{truncate(data?.clinicAddress, 20)}</li>*/}
                            {/*<li><FaDollarSign /> {data?.pricePerDay ? truncate(data?.pricePerDay, 4) : 60} (Per Hour)</li>*/}
                        </ul>
                    </div>
                    <div className="clinic-booking">
                        <Link to={`/cars/profile/${data?.id}`} className="view-pro-btn">View Profile</Link>
                        <Link to={`/booking/${data?.id}/${searchDateFrom}/${searchDateTo}`} className="apt-btn">Book
                            Appointment</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchContent