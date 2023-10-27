import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  useCheckUserIdMutation,
  useCheckEmailMutation,
  useAddNewUserMutation,
} from "./usersApiSlice";

const USERID_REGEX = /[A-z\w]{3,20}/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const Register = () => {
  const navigate = useNavigate();
  const [addNewUser, { isLoading:UserisLoading, isSuccess:UserisSuccess, isError:UserisError, error:Usererror }] =
  useAddNewUserMutation();
  const [
    checkUserId,
    { isLoading:UserIdisLoading, isSuccess:UserIdisSuccess, isError:UserIdisError, error:UserIderror },
  ] = useCheckUserIdMutation();
  const [
      checkEmail,
      { isLoading:EmailisLoading, isSuccess:EmailisSuccess, isError:EmailisError, error:Emailerror },
    ] = useCheckEmailMutation();
    
    
    const [email, setEmail] = useState("");
    const [userid, setUserId] = useState("");
    const [validUserId, setValidUserId] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordchk, setPasswordchk] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordSubmitted, setPasswordSubmitted] = useState(false);
    const [emailerrmsg, setEmailerrmsg] = useState("이메일을 입력하세요")
    const [pwderrmsg, setPwdErrmsg] = useState("!@#$% 과 영문자의 조합으로 4~12자")
    const [useriderrmsg, setUserIdErrmsg] = useState("언더바(_)를 포함한 4~20자")
    
    const pwderr = ()=>{
      if(!PWD_REGEX.test(password)){
        console.log("!@#$% 과 영문자의 조합으로 4~12자")
        setPwdErrmsg("!@#$% 과 영문자의 조합으로 4~12자")
      }else if(passwordchk !== password){
        console.log("비밀번호와 확인이 동일하지 않습니다.")
        setPwdErrmsg("비밀번호와 확인이 동일하지 않습니다.")
      }else{
        setPwdErrmsg("")
      }
    }

    useEffect(()=>{
      if(UserisSuccess){
        setEmail("")
        setUserId("")
        setPassword("")
        setPasswordchk("")
        navigate("/login")
      }
    },[UserisSuccess, navigate])
    
    useEffect(() => {
      setValidUserId(USERID_REGEX.test(userid));
  }, [userid]);
  
  useEffect(() => {
    setValidPassword([PWD_REGEX.test(password),passwordchk === password].every(Boolean));
  }, [password, passwordchk]);
  
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onPasswordchkChanged = (e) => setPasswordchk(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);
  
  const submit = async (e) => {
    e.preventDefault();
    pwderr()
    if(UserIdisSuccess){
      await addNewUser({email, userid, password})
      return;
    }else if(passwordSubmitted && validUserId){
      console.log("이게들어가?")
      await checkUserId({ userid });
      return;
    }else if(EmailisSuccess && validPassword){
      setPasswordSubmitted(true);
      return;
    }else if(!EmailisSuccess){
      await checkEmail({ email });
      return;
    }
  };//id 확인과 동시에 만들어 버리네 그치?
  const emailerr=()=>{

  }
  useEffect(()=>{
    setEmailerrmsg(Emailerror?.data?.message?Emailerror.data.message:"이메일을 입력하세요")
    if(EmailisSuccess){setEmailerrmsg("")}
  },[EmailisLoading])

  useEffect(()=>{
    if(!(USERID_REGEX.test(userid))){
      setUserIdErrmsg("언더바(_)를 포함한 4~20자")
    }else{
      setUserIdErrmsg(UserIderror?.data?.message?UserIderror.data.message:"")
    }
  },[UserIderror])

  return (
    <>
      <div className="App">
        <div className="FormDiv">
          <img
            src="/instagramLogoWhite.png"
            style={{marginTop:"5%"}}
            className="LoginLogo"
            alt="로고"
          />
          <p className="notice">{emailerrmsg}</p>
          <input
            id="email"
            name="email"
            type="email"
            className="input-field"
            value={email}
            onChange={onEmailChanged}
            placeholder="이메일"
            disabled={EmailisSuccess ? true : false}
          />
          {!EmailisLoading && EmailisSuccess && (
            <>
              <p className="notice">{pwderrmsg}</p> 
              <input
                id="password"
                name="password"
                type="password"
                className="input-field"
                placeholder="비밀번호"
                value={password}
                onChange={onPasswordChanged}
                disabled={passwordSubmitted ? true : false}
              />
              <input
                id="passwordchk"
                name="passwordchk"
                type="password"
                className="input-field"
                placeholder="비밀번호 확인"
                value={passwordchk}
                onChange={onPasswordchkChanged}
                disabled={passwordSubmitted ? true : false}
              />
            </>
          )}
          {passwordSubmitted && EmailisSuccess && (
            <>
            <input
            id="userid"
            name="userid"
            type="text"
            className="input-field"
            placeholder="유저 아이디"
            value={userid}
            onChange={onUserIdChanged}
            />
            <p className="notice">{useriderrmsg}</p>
            </>
          )}
          <button className="login-button" onClick={submit}>
            {!UserIdisLoading && UserIdisSuccess ? "가입하기" : "확인"}
          </button>
        </div>
        <div className="AskDiv">
          이미 회원이신가요?
          <Link className="register-button" to="/login">로그인</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
