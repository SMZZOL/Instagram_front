import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AddStory() {
  const navigave = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const {userid, email} = useAuth();



  const handleCancel=()=>{
    navigave('/');
  }

  const render = new FileReader();
  render.onload = (e) => {
    const image = e.target.result;
    setImageURLs((prevImageURLs) => [...prevImageURLs, image]);
  };

  const handleAddImage = (e) => {
    const selectedfiles = Array.from(e.target.files);
    selectedfiles.map((file) => render.readAsDataURL(file));
    setFiles([...files, ...selectedfiles]);
  };

  return (
    <>
        <div className="App">
          <div className="Buttondiv">
            <button className="cancelButton" onClick={handleCancel}>취소</button>
            <button className="submitButton">공유</button>
          </div>
          <div className="Home">
            {!files.length ? (
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
                <button
                  className="imgdelbutton"
                  >
                  X
                </button>
                <img src="" className="feedImg" />
              </div>
            )}
          </div>
          <div className="Buttondiv">
              <button className="prevButton">
                이전
              </button>

              <button className="nextButton">
                다음
              </button>
          </div>
        </div>
        </>
  );
}

export default AddStory;
