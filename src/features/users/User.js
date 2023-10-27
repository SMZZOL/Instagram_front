import React from 'react'
import { Link } from 'react-router-dom'

const User = ({user}) => {


  return (
    <Link className="feed-header" to={`/profile/${user.userid}`}>
        <img src="/chun.png" alt="프로필 사진" className="profile-pic"/>
        <span className="username">{user.userid}</span>
    </Link>
  )
}

export default User