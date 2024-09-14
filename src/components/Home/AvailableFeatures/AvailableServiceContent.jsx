import img1 from '../../../images/services/short-term-rentals.jpg';
import img2 from '../../../images/services/long-term-rentals.jpg';
import img3 from '../../../images/services/luxury-rentals.jpg';
import img4 from '../../../images/services/suvs-vans.jpg';
import img5 from '../../../images/services/compact-economy-cars.jpg';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';

const AvailableServiceContent = () => {
  const availableServiceArray = [
    {title: 'Short-Term Rentals', img: img1},
    {title: 'Long-Term Rentals', img: img2},
    {title: 'Luxury Rentals', img: img3},
    {title: 'SUVs and Vans', img: img4},
    {title: 'Compact and Economy Cars', img: img5},
  ]
  return (
      <div className="d-flex justify-content-center align-items-center gap-4">

        <Swiper
            spaceBetween={2}
            slidesPerView={4}
            modules={[Navigation, Autoplay]}
            loop={true}
            centeredSlides={true}
            autoplay={{delay: 2000, disableOnInteraction: false}}
        >
          {
            availableServiceArray.map((item) => (
                <SwiperSlide key={item.title} className='my-2'>
                  <div className="feature-item text-center">
                    <img src={item.img} className="img-fluid" alt=""/>
                    <p>{item.title}</p>
                  </div>
                </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
  )
}

export default AvailableServiceContent