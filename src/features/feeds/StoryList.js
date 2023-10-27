import React from 'react'
import Story from './Story'
import { Link } from "react-router-dom";

const StoryList = () => {
  return (
    <div className="StoryList">
        <Link to="/addstory" className="Story" id="Story1">
          <img src="/1.jpg" alt="프로필 사진" className="Story_img" />
          <p className="Story_username">스토리 추가</p>
        </Link>
        <Story/>
    </div>
  )
}

export default StoryList