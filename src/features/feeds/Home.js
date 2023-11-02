import React, { useEffect } from "react";
import Feed from "./Feed";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from "@fortawesome/free-solid-svg-icons"
import { useGetFeedsQuery } from "./feedsApiSlice";
import useAuth from "../../hooks/useAuth";
const Home = () => {
  const { _id, userid, email } = useAuth();
  const {
    data: feeds,
    isError,
    isSuccess,
    isLoading,
    refetch,
  } = useGetFeedsQuery(userid, {
    pollingInterval: 20000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });
  let content;
  let loading;
  if(isLoading){
    loading = <FontAwesomeIcon className='mr6' size='2xl' spin icon={faSpinner}style={{color: "#ffffff", marginTop:"30%", marginLeft:"45%"}}/>
  }
  if (isSuccess) {
    if (!feeds.length) {
      console.log("Empty?");
      content = (
        <div className="feed">     
          <p style={{ color: "white", marginTop:"20%",marginLeft:"12%" }}>Find someone to Follow!</p>
        </div>
      );
    }else{
      content = feeds.map((feed) => (
        <Feed feed={feed} key={feed._id} _id={_id} refetch={refetch} />
      ));
    }
  }
  return (
    <>
      <Header />
      <article className="Home">
        {content}
        {loading}
        </article>
    </>
  );
};

export default Home;
