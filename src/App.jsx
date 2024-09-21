import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home/Home';
import SignInForm from './components/Login/SignInForm';
import CarBooking from './components/Booking/CarBooking/CarBooking';
import BookingSuccess from './components/Booking/BookingSuccess';
import BookingInvoice from './components/Booking/BookingInvoice/BookingInvoice';
import CarProfile from './components/Doctor/CarProfile/CarProfile';
import Reserves from './components/Doctor/Reserves/Reserves';
import MyPatients from './components/Doctor/MyPatients/MyPatients';
import Reviews from './components/Doctor/Reviews/Reviews';
import Schedule from './components/Doctor/Schedule/Schedule';
import ProfileSetting from './components/Doctor/ProfileSetting/ProfileSetting';
import ChangePassword from './components/Doctor/ChangePassword/ChangePassword';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminAppointments from './components/Admin/Appointments/Appointments';
import Doctors from './components/Admin/Doctors/Doctors';
import Patients from './components/Admin/Patients/Patients';
import Profile from './components/Admin/Profile/Profile';
import Transactions from './components/Admin/Transactions/Transactions';
import Specialites from './components/Admin/Specialites/Specialites';
import AdminReviews from './components/Admin/Reviews/Reviews'
import PatientFavouriteDoctor from './components/Doctor/PatientFavourite/PatientFavourite';
import DoctorInvoice from './components/Doctor/Invoice/DoctorInvoice';
import SearchCar from './components/Doctor/SearchCar/SearchCar';
import Blogs from './components/Doctor/Blogs/Blogs';
import BlogsEdit from './components/Doctor/Blogs/BlogsEdit';
import AddBlog from './components/Doctor/Blogs/AddBlog';
import Blog from './components/Blog/Blog';
import BlogDetails from './components/Blog/BlogDetails';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Service from './components/Service/Service';
import AppointmentPage from './components/Appointment/AppointmentPage';
import TrackAppointment from './components/TrackAppointment/TrackAppointment';
import Treatment from './components/Doctor/Treatment/Treatment';
import Prescription from './components/Doctor/Prescription/Prescription';
import PrescriptionView from './components/Doctor/Prescription/PrescriptionView';
import TreatmentEdit from './components/Doctor/Treatment/TreatmentEdit';
import ViewReserve from './components/Doctor/Reserves/ViewReserve';
import ForgotPassword from './components/Login/ForgotPassword';
import Dashboard from './components/Doctor/Dashboard/Dashboard';
import PrivateOutlet from './components/Shared/PrivateOutlet';
import NotFound from './components/UI/NotFound';
import {store} from "./redux/store";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateOutlet/>}>
                    {/* Customer Dashboard  */}
                    <Route path='/reserves' element={<Reserves/>}/>
                    <Route path='/reserves/:id' element={<ViewReserve/>}/>

                    {/* Admin Dashboard  */}
                    <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                    <Route path='/admin/appointments' element={<AdminAppointments/>}/>
                    <Route path='/admin/doctors' element={<Doctors/>}/>
                    <Route path='/admin/patients' element={<Patients/>}/>
                    <Route path='/admin/transaction' element={<Transactions/>}/>
                    <Route path='/admin/specialites' element={<Specialites/>}/>
                </Route>
                <Route path='/' element={<Home/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/service' element={<Service/>}/>
                <Route path='/login' element={<SignInForm/>}/>
                <Route path='/blog' element={<Blog/>}/>
                <Route path='/blog/:id' element={<BlogDetails/>}/>
                <Route path='/track-appointment' element={<TrackAppointment/>}/>
                <Route path='/cars' element={<SearchCar/>}/>
                <Route path='/cars/:id' element={<CarProfile/>}/>
                <Route path='/booking/:carId' element={<CarBooking/>}/>
                <Route path='/booking/success/:id' element={<BookingSuccess/>}/>
                <Route path='/booking/invoice/:id' element={<BookingInvoice/>}/>

                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
