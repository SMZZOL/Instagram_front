import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const feedAdapter = createEntityAdapter({})

export const feedsApiSlice  = apiSlice.injectEndpoints({
    endpoints:builder=>({

        getFeedsbyid:builder.query({
            query: (userid)=>({
                url:`/feeds/getfeedsbyid`,
                method:"POST",
                body:{
                    userid
                }
            })
        }),
        getFeeds:builder.query({
            query: (userid)=>({
                url:`/feeds/getallfeeds`,
                method:"POST",
                body:{
                    userid
                }
            })
        }),
        addNewFeed: builder.mutation({
            query:initialFeedData=>({
                url:'/feeds',
                method:'POST',
                body:{
                    ...initialFeedData
                }
            })
        }),
        changeLikes: builder.mutation({
            query:initialFeedData=>({
                url:'/feeds/changeLikes',
                method:'POST',
                body:{
                    ...initialFeedData
                }
            })
        }),
        //random feed? =>차후에 게시물 추가태그에 따라 추가.

    })
})

export const {
    useAddNewFeedMutation,
    useGetFeedsQuery,
    useGetFeedsbyidQuery,
    useChangeLikesMutation
} = feedsApiSlice