import React, {useState} from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import {Empty, Pagination} from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import {useGetAvailableCarsQuery} from "../../../redux/api/carApi";
import moment from "moment/moment";

const SearchCar = () => {
    const query = {};
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDateFrom, setSearchDateFrom] = useState(moment().format('YYYY-MM-DD'));
    const [searchDateTo, setSearchDateTo] = useState('');

    query["size"] = size;
    query["page"] = page;

    const resetFilter = () =>{
        setPage(1);
        setSize(10);
        setSearchTerm("");
        setSearchDateFrom(moment().format('YYYY-MM-DD'));
        setSearchDateTo('');
    }

    if (!!searchTerm) {
        query.query = searchTerm
    }
    if (!!searchDateFrom) {
        query.startDate = searchDateFrom
    }
    if (!!searchDateTo) {
        query.endDate = searchDateTo
    } else {
        setSearchDateTo(moment(searchDateFrom).add(1, 'month').format('YYYY-MM-DD'));
        query.endDate = searchDateTo;
    }

    const { data, isLoading, isError } = useGetAvailableCarsQuery({ ...query })
    console.log(data)
    const cars = data?.cars;
    const meta = data?.meta;

    //what to render
    let content = null;
    if (isLoading) content = <>Loading ...</>;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && cars.length === 0) content = <div><Empty /></div>
    if (!isLoading && !isError && cars.length > 0) content =
        <>
            {
                cars && cars?.map((item, id) => (
                    <SearchContent key={id + item.id} data={item}
                                   searchDateFrom={searchDateFrom}
                                   searchDateTo={searchDateTo}/>
                ))
            }
        </>

    const onShowSizeChange = (current, pageSize) => {
        setPage(page);
        setSize(pageSize)
    }

    return (
        <div>
            <Header />
            <SubHeader title='Cars' subtitle='Lorem ipsum dolor sit amet.' />
            <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
                <div className="container-fluid">
                    <div className="row">
                        <SearchSidebar
                            setSearchTerm={setSearchTerm}
                            setSearchDateFrom={setSearchDateFrom}
                            setSearchDateTo={setSearchDateTo}
                            resetFilter={resetFilter}
                            query={query}
                        />
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {content}
                            <div className='text-center mt-5 mb-5'>
                                <Pagination
                                    showSizeChanger
                                    onShowSizeChange={onShowSizeChange}
                                    total={meta?.totalElements}
                                    pageSize={size}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchCar