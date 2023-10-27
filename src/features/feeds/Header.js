import React from "react";
import StoryList from "./StoryList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faPaperPlane} from "@fortawesome/free-regular-svg-icons"

const Header = () => {
  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
          <span className="close">&times;</span>
          {/* <!-- 동영상이나 사진을 여기에 추가 --> */}
        </div>
      </div>

      <header className="Main_Top">
        <div className="Banner">
          <img src="/instagramLogoWhite.png" alt="InstagramLogo" className="Logo" />
          <span className="FR">
            <FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff",marginRight: "0.5rem", width:"1.0rem",height:"auto"}} />
          </span>
          <span className="FR">
          <FontAwesomeIcon icon={faHeart} style={{color: "#ffffff",marginRight: "0.5rem", width:"1.0rem",height:"auto"}} />
          </span>
        </div>
        <StoryList />
      </header>
    </>
  );
};

export default Header;
