import React, { useRef, useState } from "react";
import styled from "styled-components";
import empty from "./img/empty.jpg";
import axios from "axios";

const StyledBody = styled.div`
  text-align: center;
  .upload-body {
    background: #f8f9fa;
    max-width: 650px;
    height: 750px;
    margin: 80px auto 0px auto;
    box-sizing: border-box;
    position: relative;
    margin-bottom : 100px;

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

    .text{
      display:flex;
      background:#fff0f6;
      margin : 30px 20% 30px 20%;
      justify-content : center;
      align-items : center;
      box-sizing : border-box;
      white-space: pre-wrap;
      height:20%;
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

function Body({backend_address}) {
  const inputRef = useRef();
  const [imgBase64, setImgBase64] = useState(empty);
  const [text,setText] = useState("출력 예시) 오늘도 아무것도 안하고 누워있었다냥.\n나는 아무 생각이 없다냥. 아무 생각이 없기 때문이다냥.");

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
    const response = await axios.post(backend_address.current.value, {
      // data: inputRef.current.files[0],
      image: imgBase64,
    });
    console.log('>>',response)
    setText(response.data.text);
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
        <div className='text'>
          {text}
        </div>
        <div className="upload-btn" onClick={uploadImage}>
          이미지 등록
        </div>
      </div>
    </StyledBody>
  );
}

export default Body;
