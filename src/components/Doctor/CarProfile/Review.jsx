import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import img from '../../../images/doc/doctor 3.jpg'
import {FaRegThumbsUp} from "react-icons/fa";
import moment from 'moment';
import StarRatings from 'react-star-ratings';
import {useCreateReviewMutation, useGetDoctorReviewsQuery} from '../../../redux/api/reviewsApi';
import {message} from 'antd';
import {useForm} from 'react-hook-form';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Review = ({doctorId}) => {
    const {register, handleSubmit,} = useForm({});
    const [value, setValue] = useState(null);
    const [recommend, setRecommend] = useState(null);
    const [showError, setShowError] = useState(false);

    const {data, isError, isLoading} = useGetDoctorReviewsQuery(doctorId);
    const [createReview, {
        isSuccess: createIsSuccess,
        isError: createTsError,
        error: createError,
        isLoading: createIsLoading
    }] = useCreateReviewMutation();

    const onChange = (e) => setRecommend(e.target.value);

    useEffect(() => {
        if (recommend !== null && value !== null) {
            setShowError(true)
        }
    }, [recommend, value]);

    const onSubmit = (data) => {
        const obj = {}
        obj.isRecommended = recommend === 1 ? true : recommend === 2 ? false : null;
        obj.description = data.description;
        obj.star = value && value?.toString();
        obj.doctorId = doctorId;
        if (obj.description !== '') {
            createReview({data: obj});
        } else {
            message.error("Please Add Review Text !!");
        }

    };

    useEffect(() => {
        if (!createIsLoading && createTsError) {
            message.error(createError?.data?.message);
        }
        if (createIsSuccess) {
            message.success('Successfully Review Submited !');
            setRecommend(null);
            setValue(null);
        }
    }, [createIsLoading, createTsError, createError, createIsSuccess])

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && data?.length === 0) content = <div>Empty</div>
    if (!isLoading && !isError && data?.length > 0) content =
        <>
            {
                data && data.map((item, key) => (
                    <div className='mb-4' key={item?.id + key}>
                        <div className='d-flex gap-3 justify-content-between'>
                            <div className='d-flex gap-4'>
                                <div className='review-img'>
                                    <img className="" alt="" src={img}/>
                                </div>
                                <div>
                                    <h5 className="text-nowrap">{item?.patient?.firstName + ' ' + item?.patient?.lastName}</h5>
                                    <p className="text-success">
                                        <FaRegThumbsUp/> {item?.isRecommended ? 'I recommend the doctor' : 'I do not recommend the doctor'}
                                    </p>
                                </div>
                            </div>

                            <div className='text-end'>
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
                                <div className="">Reviewed {moment(item?.createdAt).startOf('day').fromNow()}</div>
                            </div>
                        </div>
                        <div>
                            <p className="mx-2 form-text">{item?.description}</p>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <>
            <div>
                <div className="w-100 mb-3 rounded py-3 px-2" style={{background: '#f8f9fa'}}>
                    {content}
                </div>

                <div className="text-center">
                    <Link to={'/'} className='more-btn'>Show all feedback <strong>(167)</strong></Link>
                </div>
            </div>


        </>
    )
}

export default Review