import React, {useEffect} from 'react';
import './RentCar.css';
import {Link} from 'react-router-dom';
import {
	FaCheckCircle,
	FaClock,
	FaDollarSign,
	FaLocationArrow,
	FaRegHeart
} from "react-icons/fa";
import {useAddFavouriteMutation} from '../../../redux/api/favouriteApi';
import StarRatings from 'react-star-ratings';
import {message} from 'antd';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import {useGetCarsQuery} from "../../../redux/api/carApi";

const RentCar = () => {
	const { data, isError, isLoading } = useGetCarsQuery({ limit: 10 });
	const cars = data?.cars;
	const [addFavourite, { isSuccess, isLoading: FIsLoading, isError: fIsError, error }] = useAddFavouriteMutation();

	const handleAddFavourite = (id) => {
		addFavourite({ doctorId: id });
	};

	useEffect(() => {
		if (!FIsLoading && fIsError) {
			message.error(error?.data?.message)
		}
		if (isSuccess) {
			message.success('Successfully Favourite Adde')
		}
	}, [isSuccess, fIsError, FIsLoading, error?.data?.message])

	// what to render 
	let content = null;
	if (!isLoading && isError) content = <div>Something Went Wrong !</div>
	if (!isLoading && !isError && cars?.length === 0) content = <div>Empty</div>
	if (!isLoading && !isError && cars?.length > 0) content =
		<>
			{
				cars && cars?.map((item) => (
					<SwiperSlide key={item.id}>
						<div className="profile-widget">
							<div className="doc-img">
								<Link to={`/cars/profile/${item?.id}`}>
									{item?.imageUrl && <img className="img-fluid" alt="" src={item?.imageUrl} />}
								</Link>
								<a style={{ cursor: 'pointer' }} className="position-absolute top-0 end-0 me-2" onClick={() => handleAddFavourite(item?.id)}>
									<FaRegHeart />
								</a>
							</div>
							<div className="pro-content">
								<h3 className="title">
									<Link to={`/cars/profile/${item?.id}`}>
										<a>{item?.brand + ' ' + item?.model}</a>
									</Link>
									<FaCheckCircle className='verified' />
								</h3>
								<p className="speciality">{item?.description}</p>
								<div className="w-100 d-flex align-items-center">
									<StarRatings
										rating={5}
										starRatedColor="#f4c150"
										numberOfStars={5}
										name='rating'
										className="star"
										starDimension="20px"
										starSpacing="5px"
									/>
									<span className="d-inline-block text-secondary mt-2">(27)</span>
								</div>
								<ul className="available-info">
									<li>
										<FaLocationArrow className='icon' /> Georgia, USA
									</li>
									<li>
										<FaClock className='icon' /> Available on Fri, 22 Mar
									</li>
									<li>
										<FaDollarSign className='icon' /> {item?.pricePerDay}
									</li>
								</ul>
								<div className="d-flex justify-content-between align-items-center">
									<Link to={`/cars/profile/${item?.id}`} className="btn  btn-outline-info btn-sm view-profile-btn">Profile</Link>
									<Link to={`/booking/${item?.id}`} className="btn btn-sm book-btn">Book</Link>
								</div>
							</div>
						</div >
					</SwiperSlide>
				))
			}
		</>
	return (
		<section className="section-doctor container">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-3 col-lg-3">
						<div className='section-title text-center mb-2'>
							<h2>Find Your Perfect Ride</h2>
							<p className='text-secondary m-0'>Explore our diverse range of
								vehicles tailored to fit your needs.</p>
						</div>

						<div className="form-text">
							<p>
								Discover the ease and convenience of our car rental service.
								Whether you're planning a short trip or a long journey, our
								fleet offers the perfect solution for every adventure.
							</p>
							<p>
								From compact cars to luxury vehicles, our selection is designed
								to meet all your travel needs. Explore our options and find the
								ideal vehicle for your next trip.
							</p>
							<div className='text-center text-md-start my-3 my-md-0'>
								<Link to='/cars' className='more-btn'>Browse Our Fleet</Link>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-9 col-lg-9">
						<div
								className="d-flex justify-content-center align-items-center gap-3 border-0">
							<Swiper
									spaceBetween={10}
									slidesPerView={1}
									modules={[Navigation, Autoplay]}
									navigation={true}
									loop={true}
									centeredSlides={true}
									autoplay={{delay: 5000, disableOnInteraction: false}}
									breakpoints={{
										640: {slidesPerView: 2},
										768: {slidesPerView: 2},
										1024: {slidesPerView: 3},
									}}
							>
								{content}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RentCar;