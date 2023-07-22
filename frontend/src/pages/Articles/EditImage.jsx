import { RiCloseFill } from "react-icons/ri";

function EditImage(params) {
  const basePath = params.basePath
  const image = params.image

  const deleteImage = () => {
    console.log(image)
  };

  return (
    <div className="editImageDiv">
      <img
        key={image._id}
        src={basePath + image.filename}
        alt={`File "${image.originalname}" wasn't found`}
        className='editImage'
      />

      <button onClick={deleteImage} className='articleButton editButtonDeleteImage' title="Delete image">
        <RiCloseFill />
      </button>

    </div>
  )
}

export default EditImage