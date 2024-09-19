import React, {useEffect, useState} from 'react'
import {Button, DatePicker, Input, message} from 'antd';
import {FaRedoAlt, FaSearch} from "react-icons/fa";
import moment from "moment";

const SearchSidebar = ({setSearchTerm, setSearchDateFrom, setSearchDateTo, resetFilter}) => {
    const [query, setQuery] = useState('');
    const [dateFrom, setDateFrom] = useState(moment()); // Default to current date
    const [dateTo, setDateTo] = useState(null);
    const [error, setError] = useState(false); // State to manage error

    useEffect(() => {
        // Set default value for Date From to current date
        setDateFrom(moment());
    }, []);

    const handleDateFromChange = (date) => {
        setDateFrom(date);
        if (date && dateTo && date.isAfter(dateTo)) {
            setDateTo(null); // Clear Date To if Date From is after it
        }
    };

    const handleDateToChange = (date) => {
        setDateTo(date);
    };

    const disabledDateFrom = (current) => {
        return current && (current.isBefore(moment().startOf('day')) || (dateTo && current.isAfter(dateTo)));
    };

    const disabledDateTo = (current) => {
        return current && (current.isBefore(dateFrom) || current.isBefore(moment().startOf('day')));
    };

    const onSearch = () => {
        const searchTerm = query;
        const searchDateFrom = dateFrom ? dateFrom.format('YYYY-MM-DD') : null;
        const searchDateTo = dateTo ? dateTo.format('YYYY-MM-DD') : null;

        // Validation: Check if both dates are selected
        if (!searchDateFrom || !searchDateTo) {
            message.error('Please select both Date From and Date To.');
            setError(true); // Set error state to true
            return;
        }

        // Reset error state if validation passes
        setError(false);

        console.log("Search Term:", searchTerm);
        console.log("Date From:", searchDateFrom);
        console.log("Date To:", searchDateTo);

        setSearchTerm(searchTerm);
        setSearchDateFrom(searchDateFrom);
        setSearchDateTo(searchDateTo);
    }

    return (
        <div className="col-md-12 col-lg-4 col-xl-3">

            <div className="p-3 rounded" style={{background: '#f3f3f3'}}>
                <h5 className='text-center mb-3' style={{color: '#05335c'}}>Car
                    Filter</h5>
                <div className="mb-3">
                    <Input
                        placeholder="Search..."
                        allowClear
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className='mb-3'>
                    <h6 style={{color: '#05335c'}}>Date From</h6>
                    <DatePicker
                        style={{width: "100%"}}
                        format="YYYY-MM-DD"
                        value={dateFrom} // Set the default value
                        onChange={handleDateFromChange}
                        disabledDate={disabledDateFrom} // Disable dates
                        className={error && !dateFrom ? 'input-error' : ''} // Apply red border if there's an error
                    />
                </div>
                <div className='mb-3'>
                    <h6 style={{color: '#05335c'}}>Date To</h6>
                    <DatePicker
                        style={{width: "100%"}}
                        format="YYYY-MM-DD"
                        value={dateTo} // Set the current value for Date To
                        onChange={handleDateToChange}
                        disabledDate={disabledDateTo} // Disable dates
                        className={error && !dateTo ? 'input-error' : ''} // Apply red border if there's an error
                    />
                </div>

                <Button
                    className='w-100 mt-4 mb-2'
                    type="primary"
                    style={{backgroundColor: '#1977cc'}}
                    shape="round"
                    icon={<FaSearch/>}
                    size="sm"
                    onClick={onSearch} // Call onSearch when button is clicked
                >
                    Search
                </Button>

                {
                    Object.keys(query).length > 4 && <Button className='w-100 mt-4 mb-2'
                                                             style={{backgroundColor: '#1977cc'}}
                                                             onClick={resetFilter}
                                                             type="primary"
                                                             shape="round"
                                                             icon={<FaRedoAlt/>}
                                                             size="sm">Reset</Button>
                }
            </div>

        </div>
    )
}

export default SearchSidebar