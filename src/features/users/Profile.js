import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faTableCells,
  faUserTag,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "./usersApiSlice";
import { useGetFeedsbyidQuery } from "../feeds/feedsApiSlice";

const Profile = () => {
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef(null);
  const [cnt, setCnt] = useState(0);
  const [showeduser, setShowedUser] = useState();
  const [onSelect, setOnSelect] = useState(true);
  const [isLoggeduser, setIsLoggedUser] = useState(true);
  const navigate = useNavigate();
  const { userid, email } = useAuth();
  const { isfollowing, setIsfollowing } = useState(true);

  const {
    data: loggeduser,
    isError: loggedUsererror,
    isSuccess: loggedUserSuccess,
  } = useGetUserByIdQuery(userid, { 
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });
  const {
    data: feeds,
    isLoading: feedloading,
    isError: feederror,
    isSuccess: feedSuccess,
    refetch,
  } = useGetFeedsbyidQuery(userid, { 
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });
  let content;
  let loading;
  if (feedloading) {
    loading = (
      <FontAwesomeIcon
        className="mr6"
        size="2xl"
        spin
        icon={faSpinner}
        style={{ color: "#ffffff", marginTop: "30%", marginLeft: "45%" }}
      />
    );
  }

  useEffect(() => {
    if (loggedUserSuccess) {
      setShowedUser(loggeduser);
      console.log(loggeduser);
    }
  }, [loggedUserSuccess]);

  if (feedSuccess) {
    content = feeds.map((feed) => (
      <img className="photo" src={feed.files[0].data} />
    ));
  }

  const onSelected = () => {
    setOnSelect(!onSelect);
  };
  useEffect(() => {
    const tabs = tabsRef.current;
    const home = document.querySelector(".Home");
    const handleScroll = () => {
      const tabsRect = tabs.getBoundingClientRect();
      const homeRect = home.getBoundingClientRect();
      if (tabsRect.top <= homeRect.top) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    home.addEventListener("scroll", handleScroll);

    return () => {
      home.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="Home">
        <div className="profile">
          <div className="userIDdiv">
            <p className="userID">{showeduser ? showeduser.userid : "..."}</p>
            <span>
              <FontAwesomeIcon
                className="mr6"
                icon={faSquarePlus}
                style={{ color: "#ffffff" }}
              />
              <FontAwesomeIcon
                className="mr6"
                icon={faBars}
                style={{ color: "#ffffff" }}
              />
            </span>
          </div>
          <div className="userInfodiv">
            <div>
              <img
                src="/chun.png"
                alt="프로필 사진"
                className="profile-pic-big"
              />
            </div>
            <div>
              <p style={{ paddingTop: "30%" }}>
                {showeduser ? showeduser.feeds.length : "-"}
              </p>
              <p style={{ fontSize: "10px" }}>게시물</p>
            </div>
            <div>
              <p style={{ paddingTop: "30%" }}>
                {showeduser ? showeduser.follower.length : "-"}
              </p>
              <p style={{ fontSize: "10px" }}>팔로워</p>
            </div>
            <div>
              <p style={{ paddingTop: "30%" }}>
                {showeduser ? showeduser.following.length : "-"}
              </p>
              <p style={{ fontSize: "10px" }}>팔로잉</p>
            </div>
          </div>
          <div className="userContactdiv">
            {isLoggeduser ? (
              <>
                <button>프로필 편집</button>
                <button>프로필 공유</button>
                <button>+</button>
              </>
            ) : (
              <>
                {isfollowing ? (
                  <button style={{ backgroundColor: "blue" }}>팔로우</button>
                ) : (
                  <button style={{ backgroundColor: "red" }}>
                    팔로우 취소
                  </button>
                )}
                <button>메세지</button>
                <button>+</button>
              </>
            )}
          </div>
        </div>
        <div className={`tabs ${isSticky ? "sticky" : ""}`} ref={tabsRef}>
          <div
            className={onSelect ? "selectedTabs" : ""}
            onClick={!onSelect ? onSelected : null}
          >
            <FontAwesomeIcon icon={faTableCells} style={{ color: "#ffffff" }} />
          </div>
          <div
            className={!onSelect ? "selectedTabs" : ""}
            onClick={onSelect ? onSelected : null}
          >
            <FontAwesomeIcon icon={faUserTag} style={{ color: "#ffffff" }} />
          </div>
        </div>
        <div className="photos">{content}</div>
        {loading}
      </div>
    </>
  );
};

export default Profile;
