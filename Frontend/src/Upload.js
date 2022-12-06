import axios from "axios";
import React from "react";
import { Toast } from "react-bootstrap";
import ImageUploading from "react-images-uploading";

import "./Upload.css";


function Upload() {
  const [images, setImages] = React.useState(null);
  const [out_url, set_out_url] = React.useState(" ");
  const maxNumber = 20;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handlekaand = async () => {
    console.log('images: ', images[0].file)
    const formData = new FormData();
    formData.append('username', 'Chris');
    formData.append('files', images[0].file)
    console.log("FORM DATA: ", formData);
    // Request made to the backend api
    // Send formData object
    let data = await axios.post("http://127.0.0.1:5000/mri", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("DONE ")
    console.log("data:", data.data)
    set_out_url('http://localhost:5000/static/uploads/'+data.data)
    return;
  }
  return (
    <div className="Upload2">
      <ImageUploading
        single
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="300" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      {/* <div>Upload2</div> */}
      <button onClick={handlekaand} name="kaand">Submit</button>
      <img src={out_url} alt="" width="300" />
    </div>
  );
}


export default Upload
