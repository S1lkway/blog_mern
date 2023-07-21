function EditImage(params) {
  const basePath = params.basePath
  const image = params.image
  // console.log(basePath)
  // console.log(image)
  return (
    <div className="editImageDiv">
      <img
        key={image._id}
        src={basePath + image.filename}
        alt={`File "${image.originalname}" wasn't found`}
        className='editImage'
      // onClick={() => handleImageClick(index)}
      />
    </div>
  )
}

export default EditImage