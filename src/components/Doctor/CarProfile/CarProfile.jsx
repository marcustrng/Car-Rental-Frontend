import React from 'react'
import Footer from '../../Shared/Footer/Footer'
import './index.css';
import {useParams} from 'react-router-dom';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import {Empty, message, Tabs} from 'antd';
import SearchContent from '../SearchCar/SearchContent';
import OverView from './OverView';
import Review from './Review';
import {useGetCarByIdQuery} from "../../../redux/api/carApi";

const CarProfile = () => {
    const {id} = useParams();
    const {data, isLoading, isError} = useGetCarByIdQuery(id);
    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty/>
    if (!isLoading && !isError && data?.id) content = <SearchContent data={data}/>

    const items = [
        {
            key: '1',
            label: 'Overview',
            children: <OverView/>,
        },
        {
            key: '2',
            label: 'Reviews',
            children: <Review doctorId={id}/>,
        },
    ];

    return (
        <>
            <Header/>
            <SubHeader title='Car Details' subtitle='Lorem ipsum dolor sit amet.'/>
            <div className="container" style={{marginBottom: '4rem', marginTop: '6rem'}}>
                {content}
                <div className='p-4 rounded' style={{ marginBottom: '7rem', backgroundColor: '#f3f3f3' }}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CarProfile;