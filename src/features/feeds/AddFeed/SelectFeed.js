import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SelectFeed = ({setImgname,setImgtype,setOnselected,files, setFiles, imageURLs, setImageURLs, }) => {
    const navigave = useNavigate();
    const [curIndex, setCurIndex] = useState(0);
    //취소
    const handleCancel=()=>{
        navigave('/');
        }
    //내용 및 태그로 이동
    const finshSelect = ()=>{
        setOnselected((prev)=>!prev);
    }
    
    const render = new FileReader();
    render.onload = (e) => {
    const image = e.target.result;
    setImageURLs((prevImageURLs) => [...prevImageURLs, image]);
    };
    
    const previmg = () => {
    setCurIndex(curIndex - 1);
    };
    const nextimg = () => {
    setCurIndex(curIndex + 1);
    };
    const handleAddImage = (e) => {
    const selectedfiles = Array.from(e.target.files);
    selectedfiles.map((file) => {
        render.readAsDataURL(file)
        setImgname((prevfilenames) =>[...prevfilenames, file.name])
        setImgtype((prevfiletypes)=>[...prevfiletypes,file.type])
    });
    setFiles([...files, ...selectedfiles]);
    };
    
    const Handledelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setImageURLs((prevImageURLs) =>
        prevImageURLs.filter((_, i) => i !== index)
    );
    };

        
  return (
    <>
    <div className="App">
        <div className="Buttondiv">
        <button className="cancelButton" onClick={handleCancel}>취소</button>
        <button className="submitButton" onClick={finshSelect}>공유</button>
        </div>
        <div className="Home">
        {curIndex === files.length || !files.length ? (
            <>
            <label for="file-input" className="custom-file-button">
                <div className="button-content">
                +<span className="arrow"></span>
                </div>
            </label>
            <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleAddImage}
                />
            </>
        ) : (
            <div className="imgDiv">
            <img src={imageURLs[curIndex]} className="feedImg" />
            <button
                onClick={() => Handledelete(curIndex)}
                key={curIndex}
                className="imgdelbutton"
                >
                X
            </button>
            </div>
        )}
        </div>
        <div className="Buttondiv">
        {curIndex === 0 ? (
            <button
            className="prevButton"
            style={{ color: "gray" }}
            disabled={true}
            onClick={previmg}
            >
            이전
            </button>
        ) : (
            <button className="prevButton" onClick={previmg}>
            이전
            </button>
        )}
        {curIndex >= files.length ? (
            <button
            className="nextButton"
            style={{ color: "gray" }}
            disabled={true}
            onClick={nextimg}
            >
            다음
            </button>
        ) : (
            <button className="nextButton" onClick={nextimg}>
            다음
            </button>
        )}
        </div>
    </div>
    </>
  )
}

export default SelectFeed