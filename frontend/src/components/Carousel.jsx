import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactModal from 'react-modal';

function ImageCarousel({ images, basePath }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  ///Index of image in carousel
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  ///Index of image in modal
  const [modalImageId, setModalImageId] = useState(0);


  ///Open ModalImage
  const OpenImageModal = (index) => {
    setModalIsOpen(true);
    setModalImageId(index)
  };
  ///Close ModalImage
  const CloseImageModal = () => {
    setModalIsOpen(false);
  };
  ///Change Image in Carousel
  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
  };

  return (
    <>
      <div className='image-carousel'>
        <Carousel
          showThumbs={true}
          showArrows={false}
          autoPlay={true}
          interval={6000}
          infiniteLoop={true}
          showIndicators={false}
          selectedItem={selectedImageIndex}
          onChange={(index) => setSelectedImageIndex(index)}
        >
          {images.map((image, index) => (
            <div key={image._id} className='carousel-image-container' onDoubleClick={() => OpenImageModal(index)}>
              <img
                src={basePath + image.filename}
                alt={`File "${image.originalname}" wasn't found`}
                className='carousel-image'
                onClick={() => handleImageClick(index)}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={CloseImageModal}
        className="articleImageModal"
        overlayClassName="articleImageModalOverlay"
      >
        <img
          src={basePath + images[modalImageId].filename}
          alt={images[modalImageId].originalname}
          className='modal-image'
          onDoubleClick={CloseImageModal}
        />
      </ReactModal>
    </>
  );
}

export default ImageCarousel;
