import React from 'react';
import {DatePicker} from 'antd';
import moment from 'moment';

const VerifyReverse = ({content, dContent, handleDateChange}) => {
    return (
        <div style={{margin: '2rem 0'}}>
            {content}
            <>
                <div style={{marginBottom: '1.5rem'}}>
                    <h5>Selected Date Range:</h5>
                    <DatePicker.RangePicker
                        id={{
                            start: moment(),
                            end: moment().add(1, "month"),
                        }}
                        onChange={handleDateChange}
                        format="YYYY-MM-DD"
                    />
                </div>
            </>
        </div>
    );
}

export default VerifyReverse;
