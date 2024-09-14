import React, {useState} from 'react';
import Footer from '../../Shared/Footer/Footer';
import SearchSidebar from './SearchSidebar';
import SearchContent from './SearchContent';
import {useDebounced} from '../../../utils/hooks/useDebounced';
import {Empty, Pagination} from 'antd';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import {useGetCarsQuery} from "../../../redux/api/carApi";

const SearchCar = () => {
    const query = {};
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByGender, setSorByGender] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [priceRange, setPriceRange] = useState({});

    query["limit"] = size;
    query["page"] = page;
    query["sortBy"] = sortBy;
    query["sortOrder"] = sortOrder;

    sortByGender !== '' && (query["gender"] = sortByGender);
    specialist !== '' && (query["specialist"] = specialist);

    const priceDebounced = useDebounced({ searchQuery: priceRange, delay: 600 });
    const debounced = useDebounced({ searchQuery: searchTerm, delay: 600 })

    if (Object.keys(priceDebounced).length !== 0 && !!priceDebounced) {
        const { min, max } = priceDebounced
        query["min"] = min;
        query["max"] = max;
    }

    const resetFilter = () =>{
        setPage(1);
        setSize(10);
        setSortOrder("");
        setSearchTerm("");
        setSortOrder("");
        setSorByGender("");
        setSpecialist("");
        setPriceRange({});
    }

    if (!!debounced) { query.searchTerm = debounced }

    const { data, isLoading, isError } = useGetCarsQuery({ ...query })
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
                    <SearchContent key={id + item.id} data={item} />
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
                            setSorByGender={setSorByGender}
                            setSpecialist={setSpecialist}
                            setPriceRange={setPriceRange}
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