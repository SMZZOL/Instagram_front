import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquarePlus} from "@fortawesome/free-regular-svg-icons"
import {faBars,faTableCells, faUserTag,faSpinner} from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth';
import { useParams,useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery,useUpdateUserMutation } from './usersApiSlice';
import { useGetFeedsbyidQuery } from '../feeds/feedsApiSlice';

const ProfileWithId = () => {
  const [isSticky, setIsSticky] = useState(false);
    const tabsRef = useRef(null);
    const [showeduser, setShowedUser] = useState();
    const [onSelect, setOnSelect] = useState(true);
    const [isLoggeduser, setIsLoggedUser]= useState(true)
    const {id} = useParams();
    const navigate = useNavigate();
    const {userid} = useAuth();
    const [isfollowing, setIsfollowing]= useState(false);
    
    const {data:loggeduser, isError:loggedUsererror, isSuccess:loggedUserSuccess, refetch:refetchloggedUser} = useGetUserByIdQuery(userid);
    const {data:searcheduser, isError:searcheduserError, isSuccess:searcheduserSuccess, refetch:refetchsearchedUser} = useGetUserByIdQuery(id);
    const {data:feeds, isLoading:feedloading, isError:feederror, isSuccess:feedSuccess} = useGetFeedsbyidQuery(id,{pollingInterval:20000})

    const [updateUser, {isSuccess:followingSuccess, isLoading:updateUserLoading}] = useUpdateUserMutation();
    
    let content;
    let loading;

    if(feedloading||updateUserLoading){
      loading = loading = <FontAwesomeIcon className='mr6' size='2xl' spin icon={faSpinner}style={{color: "#ffffff", marginTop:"30%", marginLeft:"45%"}}/>
    }
  

    if(feedSuccess){

      content = feeds.map((feed)=><img class="photo" src={feed.files[0].data}/>)
  
    }
    

    const checkedFollowing=async()=>{
        if(loggeduser.following.includes(searcheduser._id)){
        // 팔로잉 입장에서의 취소
        const Newfollowing =loggeduser.following.filter(id => id !== searcheduser._id);
        let updateduser = {...loggeduser, following:Newfollowing};
        await updateUser({updateduser})
        // 팔로워 입장에서의 제거
        const Newfollower = searcheduser.follower.filter(id => id!== loggeduser._id);
        updateduser = {...searcheduser, follower:Newfollower}
        console.log(updateduser)
        await updateUser({updateduser})
        setShowedUser(updateduser)
        setIsfollowing(false);
        }else{
        // 팔로잉 추가
        let updateduser = {...loggeduser, following:[...loggeduser.following,searcheduser._id]};
        await updateUser({updateduser})
        // 팔로워 추가
        updateduser = {...searcheduser, follower:[...searcheduser.follower,loggeduser._id]}
        console.log(updateduser)
        await updateUser({updateduser})
        setShowedUser(updateduser)
        setIsfollowing(true);
        }
        //리패치 
        refetchloggedUser();
        refetchsearchedUser();
    }
    
    useEffect(()=>{
    if(id){
        setIsLoggedUser(false);
    }
    },[id])

    useEffect(()=>{
    if(searcheduserSuccess && loggedUserSuccess){
      if(id===userid){
        navigate("/profile")
      }
      console.log(searcheduser.follower.length)
      setIsfollowing(loggeduser.following.includes(searcheduser._id))
      setShowedUser(searcheduser)
    }
    },[loggedUserSuccess,searcheduserSuccess,id,updateUserLoading])

    const onSelected = ()=>{ 
        setOnSelect(!onSelect);
    }
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

    home.addEventListener('scroll', handleScroll);

    return () => {
        home.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
      <div className="Home">
      <div className="profile">
        <div className='userIDdiv'>
          <p className='userID'>
            {showeduser?showeduser.userid:"..."}
            </p>
          <span>
            <FontAwesomeIcon className='mr6' icon={faSquarePlus}style={{color: "#ffffff"}}/>
            <FontAwesomeIcon className='mr6' icon={faBars}style={{color: "#ffffff"}}/>
          </span>
        </div>
        <div className='userInfodiv'>
          <div>
            <img src="/chun.png" alt="프로필 사진" className="profile-pic-big"/>
          </div>
          <div>
          <p style={{paddingTop:"30%"}}>59</p>
          <p style={{fontSize:"10px"}}>게시물</p>
          </div>
          <div>
          <p style={{paddingTop:"30%"}}>{showeduser?showeduser.follower.length:"-"}</p>
          <p style={{fontSize:"10px"}}>팔로워</p>
          </div>
          <div>
          <p style={{paddingTop:"30%"}}>{showeduser?showeduser.following.length:"-"}</p>
          <p style={{fontSize:"10px"}}>팔로잉</p>
          </div>
        </div>
        <div className='userContactdiv'>
          {isLoggeduser?(
              <>
            <button>프로필 편집</button>
            <button >프로필 공유</button>
            <button>+</button>
            </>
            )
          :  (
            <>
            {isfollowing
            ?<button onClick={checkedFollowing} style={{backgroundColor:"red"}}>팔로우 취소</button>
            :<button onClick={checkedFollowing} style={{backgroundColor:"blue"}}>팔로우</button>
            }
          <button>메세지</button>
          <button>+</button>
          </>
            )
          }
        </div>
      </div>
      <div className={`tabs ${isSticky ? 'sticky' : ''}`} ref={tabsRef}>
        <div 
        className={onSelect?'selectedTabs':''}
        onClick={!onSelect?onSelected:null}
        >
            <FontAwesomeIcon icon={faTableCells}style={{color: "#ffffff"}}/>
        </div>
        <div 
        className={!onSelect?'selectedTabs':''}
        onClick={onSelect?onSelected:null}
        >
            <FontAwesomeIcon icon={faUserTag}style={{color: "#ffffff"}}/>
        </div>
      </div>
      <div className="photos">
          {content}
      </div>
          {loading}
    </div>
  );
};

export default ProfileWithId;
