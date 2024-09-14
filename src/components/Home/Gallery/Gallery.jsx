import React from 'react';
import img2 from '../../../images/galleries/gallery-1.png';
import img3 from '../../../images/galleries/gallery-2.png';
import img4 from '../../../images/galleries/gallery-3.png';
import img5 from '../../../images/galleries/gallery-4.png';
import img6 from '../../../images/galleries/gallery-5.png';
import img7 from '../../../images/galleries/gallery-6.png';
import img8 from '../../../images/galleries/gallery-7.png';
import img9 from '../../../images/galleries/gallery-8.png';
import './index.css';
import {Image} from 'antd';

const Gallery = () => {
  const imageArray = [img2, img3, img4, img5, img6, img7, img8, img9]
  return (
      <section className="gallery container">
        <div className="text-center mb-5">
          <div className="section-title mb-3">
            <h2>Gallery</h2>
            <p>Explore a curated selection of images showcasing our diverse
              range of vehicles. Get inspired and see our cars in action to find
              the perfect one for your needs.</p>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row g-0">
            <Image.PreviewGroup>
              {
                imageArray.map((item, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-12"
                         key={index + 55}>
                      <div className="gallery-item">
                        <div
                            className="galelry-lightbox d-flex justify-content-center align-items-center">
                          <Image src={item} alt="" className="w-100" style={{
                            objectFit: 'cover',
                            maxHeight: '280px',
                            minHeight: '280px'
                          }}/>
                        </div>
                      </div>
                    </div>
                ))
              }
            </Image.PreviewGroup>
          </div>

        </div>
      </section>
  )
}

export default Gallery