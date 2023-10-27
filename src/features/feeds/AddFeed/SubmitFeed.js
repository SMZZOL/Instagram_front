import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";
import { useGetUserByIdQuery,useGetFollowsbyIdQuery } from "../../users/usersApiSlice";
import { useAddNewFeedMutation } from "../../feeds/feedsApiSlice"



const SubmitFeed = ({
    imgname,imgtype,imageURLs,setOnselected,
    setFiles,setImageURLs,setImgtype
}) => {
    const navigave = useNavigate();
    const [taged, setTaged] = useState([[]])
    const [render, setRender] = useState(true)
    const [selectedOption, setSelectedOption] = useState('default')
    const [content, setContent] = useState("")
    const {userid, email} = useAuth();
    const {data:loggeduser, isError, isSuccess,isLoading} = useGetUserByIdQuery(userid);
    const {data:follows, isLoading:followLoading, isSuccess:followSuccess,refetch} = useGetFollowsbyIdQuery({userid})
    const [addNewFeed,{isSuccess:addNewFeedSuccess, error:addNewFeederror}] = useAddNewFeedMutation();

    const contentchanged = (e)=>setContent(e.target.value)
    
    const onCancel=()=>{
        setOnselected((prev)=>!prev);
        setTaged([[]])

        setContent("")
    }
    const onSubmit=async()=>{
        const {followers} = follows
        const data = {
            content,
            user: userid,
            files: imageURLs.map((url, i) => ({
            data: url,
            type: imgtype[i],
            taged: taged[i].map(userid=>{
                const result = followers.find(follower=>follower.userid===userid)
                return result._id
            })
            })),
        }
        console.log(data)  
        await addNewFeed(data);

    }
    useEffect(()=>{
        if(addNewFeedSuccess){
            setFiles([])
            setImageURLs([])
            setImgtype([])
            navigave('/profile')
        }
    },[addNewFeedSuccess])
    const deltag = (i, j)=>{
        console.log(i)
        console.log(j)
        setTaged(prevtag=>{
            const newtag = prevtag;
            newtag[i][j] =null;
            return newtag;
        })
        setRender(!render)
        setSelectedOption("default")
    }
    useEffect(()=>{
        const initag=[[]]
        imgname.map((_,i)=>{
            initag[i] = [];
        })
        setTaged(initag);
    },[])
    const tagAdded = (e, i)=>{
        setTaged(prevtag=>{
            const newarr = prevtag
            if(prevtag[i].includes(e.target.value)){
                return prevtag;
            }
            const prev = prevtag[i]
            const newTag = [...prev, e.target.value]
            newarr[i] = newTag;
            return newarr;
        })
        console.log(taged)
        setRender(!render)
        setSelectedOption("default")
    }

    let imgcontainer
    if(isLoading || followLoading){
        imgcontainer= <p>Loading..</p>
    }
    if(followSuccess&&isSuccess){
        const {followers} = follows
        imgcontainer = imageURLs.map((imgurl ,i)=>(
            <div className="feedImgsContainer" key={i}>
            <img className="feedImgs"src={imgurl}/>
                <span className="feedTag">
                    <select 
                    className="feedTagselect" 
                    value={selectedOption}
                    onChange={(e) => tagAdded(e, i)}
                    >
                        <option value="default"></option>
                        {followers.map((follower)=>(
                            <option key={follower._id} value={follower.userid}>{follower.userid}</option>
                        ))}
                    </select>
                    {taged[i] && taged[i].map((tag, j) => (
                    <>
                        <button onClick={()=>deltag(i,j)} className="tagdelbutton">{tag}</button>
                    </>
                    ))}

                </span>
            </div>
        ))
    }
    
    return (
    <div className="App">
        <input 
        type="textarea"
        className="feedText"
        placeholder="게시물 문구 입력"
        onChange={contentchanged}
        value={content}
        />
      <div className="Home">
        {imgcontainer}
      </div>
      <div className="Buttondiv">
        <button className="cancelButton" onClick={onCancel}>취소</button>
        <button className="submitButton" onClick={onSubmit}>공유</button>
        </div>
    </div>
  );
};

export default SubmitFeed;
