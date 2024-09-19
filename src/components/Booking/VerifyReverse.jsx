import React, {useState} from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

const VerifyReverse = ({content, dContent, handleDateChange}) => {
    const [dates, setDates] = useState([moment("2024-09-20"), moment("2024-09-20").add(1, "month")]);

    const onChange = (dates) => {
        setDates(dates);
    };

    return (
        <div style={{margin: '2rem 0'}}>
            {content}
            <>
                <div style={{marginBottom: '1.5rem'}}>
                    <h5>Selected Date Range:</h5>
                    <DatePicker.RangePicker
                        value={dates}
                        onChange={onChange}
                        format="YYYY-MM-DD"
                    />
                </div>
            </>
        </div>
    );
}

export default VerifyReverse;
