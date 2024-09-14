import './index.css';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { Empty } from 'antd';
import { useGetCarsQuery } from '../../../redux/api/carApi';

const OurCars = () => {
    const { data, isLoading, isError } = useGetCarsQuery({ limit: 4 });
    console.log("data", data);
    const cars = data?.cars;

    let content = null;
    if (!isLoading && isError) content = <div>Something Went Wrong !</div>
    if (!isLoading && !isError && cars?.length === 0) content = <div><Empty /></div>
    if (!isLoading && !isError && cars?.length > 0) content =
        <>
            {
                cars && cars?.map((item, key) => (
                    <div className="col-lg-6 mt-3" key={key + 2}>
                        <div className="member d-flex align-items-start">
                            <div className="pic">
                                {item.imageUrl && <img src={item.imageUrl} className="img-fluid" alt="" />}
                            </div>
                            <div className="member-info">
                                <h4>{item?.brand + ' ' + item?.brand}</h4>
                                <span>{item?.description}</span>
                                <p>{item?.description}</p>
                                <div className="social">
                                    <a><FaFacebookSquare className='icon' /></a>
                                    <a><FaInstagramSquare className='icon' /></a>
                                    <a><FaLinkedin className='icon' /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="section-title text-center mb-3">
                    <h2>OUR CARS</h2>
                    <p className='form-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, adipisci?</p>
                </div>

                <div className="row">
                    {content}
                </div>
            </div>
        </section>
    )
}

export default OurCars;