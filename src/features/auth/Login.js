import React,{useState, useEffect,useRef} from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
  const userRef = useRef()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()
  
  const emailInput = (e)=>setEmail(e.target.value)
  const passwordInput = (e)=>setPassword(e.target.value)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ontestClicked= ()=>{
    setEmail("test12")
    setPassword("test1234")
  }
  useEffect(()=>{
    userRef.current.focus();
  },[])
  const onSubmit = async(e)=>{
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap()
      console.log(accessToken)
      dispatch(setCredentials({ accessToken }))
      setEmail("")
      setPassword("")
      navigate("/")
    } catch (err) {
      if (!err.status) {
        setErrMsg('서버 응답이 없습니다');
    } else if (err.status === 400) {
        setErrMsg('이메일 또는 암호가 빈칸입니다');
    } else if (err.status === 401) {
        setErrMsg('인증 불가');
    } else {
        setErrMsg(err.data?.message);
    }
    // errRef.current.focus();
    }

  }
  return (
    <>
      <div className="App">
        <div className="FormDiv">
          <img src="instagramLogoWhite.png" className="LoginLogo" />
          <p className="notice">{errMsg}</p> 
          <input 
          type="text" 
          className="input-field" 
          id="email"
          ref={userRef}
          placeholder="아이디" 
          onChange={emailInput}
          value={email}
          required
          />
          <input 
          type="password" 
          id="password"
          className="input-field" 
          placeholder="비밀번호" 
          onChange={passwordInput}
          value={password}
          required/>

          <button className="forget-button" onClick={ontestClicked}>테스트 계정으로 하시겠어요?</button>
          {isLoading
          ?
          <><br></br>
          <FontAwesomeIcon className='mr6' size='2xl' spin icon={faSpinner}style={{color: "#ffffff", marginTop:"10%"}}/>
          </>
          :
          <button 
          className="login-button"
          onClick={onSubmit}>
            로그인
          </button>

          }

        </div>
        <div className="AskDiv">
          계징이 없으신가요?
          <Link className="register-button" to="/register">가입하기</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
