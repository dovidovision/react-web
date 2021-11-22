import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import empty from "./img/empty.jpg";
import axios from "axios";

const StyledBody = styled.div`
  text-align: center;
  .upload-body {
    background: #f8f9fa;
    max-width: 650px;
    height: 550px;
    margin: 80px auto 0px auto;
    box-sizing: border-box;
    position: relative;

    input {
      display: none;
    }

    .upload-title {
      display: inline-block;
      margin-top: 25px;
      margin-bottom: 0;
      border-bottom: 1px solid gray;
    }
    .upload-desc {
      margin-top: 0;
      margin-bottom: 20px;
    }

    .input-image {
      height: 250px;
      background: #e9ecef;
      border-radius: 16px;
      width: 50%;
    }

    .upload-btn {
      position: absolute;
      left: 50%;
      bottom: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px auto 0px auto;
      background: #ffdeeb;
      color: #f783ac;
      width: 150px;
      height: 50px;
      border-radius: 12px;
      transform: translateX(-50%);
      cursor: pointer;
    }
  }
`;

function Body() {
  const inputRef = useRef();
  const [imgBase64, setImgBase64] = useState(empty);

  const onClick = () => {
    // console.log(imgBase64);
    inputRef.current.click();
  };

  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = reader.result.toString();
        setImgBase64((imgBase64) => base64);
      };
    }
  };

  const uploadImage = async () => {
    const response = await axios.post("http://146.56.129.247:5000/image", {
      // data: inputRef.current.files[0],
      image: imgBase64,
    });
    console.log(response.data.text);
    setImgBase64(
      "data:image/jpeg;base64," +
        response.data.image.slice(2, response.data.image.length - 1)
    );
  };

  return (
    <StyledBody>
      <div className="upload-body">
        <h2 className="upload-title">고양이 이미지</h2>
        <p className="upload-desc">원하는 고양이 이미지를 업로드 하세요</p>

        <input
          ref={inputRef}
          type="file"
          className="img-input"
          accept="image/*"
          onChange={onChangeImage}
        />

        <img className="input-image" src={imgBase64} alt="" onClick={onClick} />
        <div className="upload-btn" onClick={uploadImage}>
          이미지 등록
        </div>
      </div>
    </StyledBody>
  );
}

export default Body;
