import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchUserQuery } from './usersApiSlice'

import User from './User'

const SearchUser = () => {
    const [searchword, setSearchword]= useState("");
    const recommend = {
        user:[
            {userid:"qwer"},
            {userid:"koko3"},
        ]
    }
    const {data:users, isError, isSuccess,isLoading,refetch} = useSearchUserQuery({searchword});
    let content
    if(!searchword){
        content=
        <>
        </>
    }

    if (isLoading) {content = <p>Loading...</p>}

    if(isSuccess && searchword){
        content= users.map(user=><User user={user} key={user._id}/>
    )}

    const onsearchWordChanged = (e)=>{
        setSearchword(e.target.value);
        console.log(users)
        if(searchword){
            refetch();
        }
    }

    return (
    <>
    <header className='searchHeader'>
        <input 
        type='text' 
        className='searchInput'
        placeholder='검색'
        onChange={onsearchWordChanged}
        value={searchword}
        />   
    </header>
    <div className='Home'>
        {content}
    </div>
    </>
    )
}

export default SearchUser