import axios from "axios";
import React from "react";
import { Toast } from "react-bootstrap";
import ImageUploading from "react-images-uploading";
import { Col , Row , Container } from 'react-bootstrap';
import Uploadicon from "./upload.png";

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

  const uploadtitle='Upload your images here';
  const uploadfiles='Drag and drop files to upload';
  const filetype='Supported files  PNG, .nii.gz, JPEG';
  const OR='OR';
  const uploadsubtitle='Drag and drop or upload from device';

  const square={square:{
    width:"250px",
    height:"250px",
    backgroundColor:"White",
    borderRadius:"10px",
    borderColor:"#00CFBD"

  }}

   

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
            <h2 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "40px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "left",
                fontWeight: "500",
                lineHeight: "normal",
                fontStretch: "normal",
                marginLeft: "150px",
                marginRight: "0",
                marginBottom: "29px"
            }}>{uploadtitle}</h2>
            <h3 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "22px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "left",
                fontWeight: "400",
                lineHeight: "normal",
                fontStretch: "normal",
                marginLeft: "150px",
                marginRight: "0",
                marginBottom: "26px"
            }}>{uploadsubtitle}</h3>
            <Container>
              <Row>
            <Col md={6} xl={6} lg={6} sm={12}>
            <div className="single-feature-box">
            <img src={Uploadicon} alt="Uploadicon" />
            <h4 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "20px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "center",
                fontWeight: "300",
                lineHeight: "normal",
                fontStretch: "normal",
                marginLeft: "0px",
                marginRight: "0",
                marginBottom: "26px"
            }}>{uploadfiles}</h4>
            <h3 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "20px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "center",
                fontWeight: "300",
                lineHeight: "normal",
                fontStretch: "normal",
                marginRight: "0",
                marginBottom: "26px"
            }}>{OR}</h3>
                <button
              style={ { color: "white",height: "auto",
              fontSize: "18px",
              backgroundColor: "#00CFBD",
              borderRadius: "10px",fontStyle: "Regular",
              borderColor:"transparent",
              textAlign: "center",
              fontWeight: "400",
              lineHeight: "normal",
              fontStretch: "normal" } }
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload a T1 image
            </button>
            <h5 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "13px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "center",
                fontWeight: "150",
                lineHeight: "normal",
                fontStretch: "normal",
                marginLeft: "0px",
                marginRight: "0",
                marginBottom: "26px"
            }}>{filetype}</h5>
            </div>
        </Col>
        <Col md={6} xl={6} lg={6} sm={12}>
            <div className="single-feature-box">
            <img src={Uploadicon} alt="Uploadicon" marginBottom='20px'/>
            <h4 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "20px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "center",
                fontWeight: "300",
                lineHeight: "normal",
                fontStretch: "normal",
                marginLeft: "0px",
                marginRight: "0",
                marginBottom: "26px"
            }}>{uploadfiles}</h4>
            <h3 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "20px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "center",
                fontWeight: "300",
                lineHeight: "normal",
                fontStretch: "normal",
                marginRight: "0",
                marginBottom: "26px"
            }}>{OR}</h3>
                <button
              style={ { color: "white",height: "auto",
              fontSize: "18px",
              backgroundColor: "#00CFBD",
              borderRadius: "10px",fontStyle: "Regular",
              borderColor:"transparent",
              textAlign: "center",
              fontWeight: "400",
              lineHeight: "normal",
              fontStretch: "normal" } }
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload a T2 image
            </button>
            <h5 style={{
                color: "#2C2C2C",
                height: "auto",
                fontSize: "13px",
                alignSelf: "auto",
                fontStyle: "SemiBold",
                textAlign: "center",
                fontWeight: "150",
                lineHeight: "normal",
                fontStretch: "normal",
                marginLeft: "0px",
                marginRight: "0",
                marginBottom: "26px"
            }}>{filetype}</h5>
            </div>
        </Col>
        </Row>
        </Container>
            &nbsp;
            <div></div>
            <button style={{ color: "white",height: "auto",
              fontSize: "18px",
              backgroundColor: "#00CFBD",
              borderRadius: "10px",fontStyle: "Regular",
              borderColor:"transparent",
              textAlign: "center",
              fontWeight: "400",
              lineHeight: "normal",
              fontStretch: "normal" }} onClick={onImageRemoveAll}>Remove all images</button>
              <div/>
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
      <div>
      <button style={{ color: "white",height: "auto",
              fontSize: "18px",
              backgroundColor: "#00CFBD",
              borderRadius: "10px",fontStyle: "Regular",
              borderColor:"transparent",
              textAlign: "center",
              fontWeight: "400",
              lineHeight: "normal",
              fontStretch: "normal" }}
              onClick={handlekaand} name="kaand">Submit</button>
              </div>
      
      <Container>
              <Row>
              <Col md={6} xl={12} lg={6} sm={12}>
              <img src={out_url} alt="" width="300" />
              </Col>
              </Row>
            </Container>
    </div>
    
  );
}


export default Upload
