import React from 'react';
import img from '../../images/avatar.jpg';
import './DashboardSidebar.css';
import { Link, NavLink } from 'react-router-dom';
import useAuthCheck from '../../redux/hooks/useAuthCheck';
import {
    FaTable,
    FaCalendarDay,
    FaUserInjured,
    FaHourglassStart,
    FaRegStar, FaUserCog, FaBlog,
    FaSignOutAlt,
    FaLock,
    FaHouseUser
} from "react-icons/fa";
import {getUser} from "../../service/auth.service";

const DashboardSidebar = () => {
    const data = getUser();
    console.log("DashboardSidebar data", data);
    return (
        <div className="profile-sidebar p-3 rounded">
            <div className="p-2 text-center border-bottom">
                <div className="profile-info text-center">
                    <Link to={'/'}><img src={data?.img ? data?.img : img} alt=""/></Link>
                    <div className='profile-details'>
                        <h5 className='mb-0'>{data?.firstName + " " + data?.lastName}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardSidebar;