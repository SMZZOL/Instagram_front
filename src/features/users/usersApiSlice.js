import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            //keepUnusedDataFor: 5,//cache에 저장되는 시간.default 는 60초.
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        getUserById:builder.query({
            query:(userid)=>`/users/${userid}`

        }),
        getFollowsbyId:builder.query({
            query:({userid})=>({
                url:"/users/follows",
                method:"POST",
                body:{
                    userid
                }
            })
        }),
        searchUser:builder.query({
            query:({searchword})=>({
                url:"/users/search",
                method:"POST",
                body:{
                    searchword
                }
            })
        }),
        checkEmail:builder.mutation({
            query:({email})=>({
                url:"/users/checkemail",
                method:"POST",
                body:{
                    email
                }
            })
        }),
        checkUserId:builder.mutation({
            query:({userid})=>({
                url:"/users/checkuserid",
                method:"POST",
                body:{
                    userid
                }
            })
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useCheckUserIdMutation,
    useCheckEmailMutation,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useSearchUserQuery,
    useGetFollowsbyIdQuery
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
