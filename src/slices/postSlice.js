import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    postList:[],
    selectedPost:{},
    isLoading:false,
    error:''
}

//API URL
const Server_URL = 'https://jsonplaceholder.typicode.com/posts'

//get Posts
export const getPostsFromServer = createAsyncThunk(
    "posts/getPostsFromServer",
    async(_,{rejectWithValue}) =>{
        const response = await fetch(Server_URL)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else{
            return rejectWithValue({error:'no posts'})
        }
    }
)

//add Post
export const addPosttoServer = createAsyncThunk(
    "posts/addPosttoServer",
    async(post,{rejectWithValue}) =>{
        const options = {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }
        const response = await fetch(Server_URL, options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No posts'})
        }
    }
)

const postSlice = createSlice({
    name:'postSlice',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(getPostsFromServer.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(getPostsFromServer.fulfilled,(state,action) =>{
                state.isLoading = false
                state.error = ''
                state.postList = action.payload
            })
            .addCase(getPostsFromServer.rejected,(state, action) =>{
                state.error = action.payload.error
                state.isLoading = false
                state.postList = []
            })
            .addCase(addPosttoServer.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(addPosttoServer.fulfilled,(state, action) =>{
                state.isLoading = false
                state.error = ''
                state.postList.push(action.payload)
            })
            .addCase(addPosttoServer.rejected,(state, action) =>{
                state.error = action.payload.error
                state.isLoading = false
                state.postList = []
            })
    }
})

export default postSlice.reducer