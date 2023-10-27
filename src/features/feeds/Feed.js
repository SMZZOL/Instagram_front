import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faPaperPlane} from "@fortawesome/free-regular-svg-icons"
import { faHeart as faHeartred} from '@fortawesome/free-solid-svg-icons'
import { useChangeLikesMutation } from './feedsApiSlice'
import { Link } from 'react-router-dom'
const Feed = ({feed, _id, refetch}) => {
    const [changeLikes, {isSuccess, isLoading}]= useChangeLikesMutation();
    const [isLiked , setIsliked] = useState(false)

    useEffect(()=>{
        console.log(feed.likes)
        setIsliked(feed.likes.includes(_id))
    },[isLoading,isSuccess])

    const onchangedLikes = async ()=>{
        await changeLikes({feed_id:feed._id, user_id:_id})
        setIsliked(!isLiked)
        refetch();
    }
    return (
        <div className="feed">
            {/* <div className="feed-header" onClick={toprofile}>
                <img src="/chun.png" alt="프로필 사진" className="profile-pic"/>
                <span className="username">yerronii_</span>
            </div> */}
            <Link className="feed-header" to={`/profile/${feed.userid}`}>
                <img src="/chun.png" alt="프로필 사진" className="profile-pic"/>
                <span className="username">{feed.userid}</span>
            </Link>
            <img src={feed.files[0].data} alt="게시물 이미지" className="feed-image"/>
            <div className="feed-actions">
                {isLiked
                ?<FontAwesomeIcon onClick={onchangedLikes} icon={faHeartred} style={{color: "#ff0000",marginRight: "0.5rem"}} />
                :<FontAwesomeIcon onClick={onchangedLikes} icon={faHeart}  style={{color: "#ffffff",marginRight: "0.5rem"}} />
                }         
                <FontAwesomeIcon icon={faComment}  style={{color: "#ffffff",marginRight: "0.5rem"}} />
                <FontAwesomeIcon icon={faPaperPlane}  style={{color: "#ffffff",marginRight: "0.5rem"}} />
                {/* <i className="fa-regular fa-comment" style="color: #ffffff;  margin-right: 0.5rem;"></i> */}
                {/* <i className="fa-regular fa-paper-plane" style="color: #ffffff;  margin-right: 0.5rem;"></i> */}
            </div>
            <div className="likes">{`${feed.likes.length}명이 좋아합니다`}</div>
            <div className="caption">
                <span className="username">{feed.userid}</span> {feed.content}
            </div>

            <div className="comments">
                <div className="comment">
                    <span className="username">smkoxox</span>  맞다
                </div>
                {/* <!-- 다른 댓글들을 추가할 수 있습니다. --> */}
            </div>
        </div>
    )
}

export default Feed