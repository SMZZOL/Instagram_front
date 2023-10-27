import React from "react";
import Feed from "./Feed";
import Header from "./Header";
import { useGetFeedsQuery } from "./feedsApiSlice";
import useAuth from "../../hooks/useAuth";
const Home = () => {
  const {_id, userid, email} = useAuth();
  const {data:feeds, isError, isSuccess, isLoading, refetch} = useGetFeedsQuery(userid,{pollingInterval:60000});
  let content;
  if(isSuccess){
    content = feeds.map((feed)=><Feed feed={feed} _id={_id} refetch={refetch}/>)
  }
  return (
    <>
      <Header/>
      <article className="Home">
        {content}
      </article>
    </>
  );
};

export default Home;
