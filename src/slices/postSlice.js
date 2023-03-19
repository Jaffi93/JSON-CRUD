import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    postList:[],
    selectedPost:{},
    isLoading:false,
    error:''
}
const Server_URL = 'https://jsonplaceholder.typicode.com/posts'
//Get Posts
export const getPostsFromServer = createAsyncThunk(
    "posts/getPostsFromServer",
    async(_,{rejectWithValue}) =>{
        const response = await fetch(Server_URL)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No posts'})
        }
    }
)
//Add Posts
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
//update Posts
export const updatePosttoServer = createAsyncThunk(
    "posts/updatePosttoServer",
    async(post,{rejectWithValue}) =>{
        const options = {
            method: 'PATCH',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }
        const response = await fetch(Server_URL + '/' + post.id, options)
        if(response.ok){
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No posts'})
        }
    }
)
//delete Posts
export const deletePosttoServer = createAsyncThunk(
    "posts/deletePosttoServer",
    async(post,{rejectWithValue}) =>{
        const options = {
            method: 'DELETE',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }
        const response = await fetch(Server_URL + '/' + post.id, options)
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
    reducers:{
        addPostToList:(state,action) =>{
            let post={...action.payload}
            state.postList.push(post)
        },
        removeFromPost:(state,action) =>{
            state.postList = state.postList.filter((post) => post.id !== action.payload.id )
        },
        setSelectedPost:(state,action) =>{
            state.selectedPost = action.payload
        }
    
    },
    extraReducers:(builder) =>{
        builder
            .addCase(getPostsFromServer.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(getPostsFromServer.fulfilled,(state, action) =>{
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
            .addCase(updatePosttoServer.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(updatePosttoServer.fulfilled,(state, action) =>{
                state.isLoading = false
                state.error = ''
                state.postList = state.postList.map((post) => post.id === action.payload.id ? action.payload : post)
            })
            .addCase(updatePosttoServer.rejected,(state, action) =>{
                state.error = action.payload.error
                state.isLoading = false
                state.postList = []
            })
            .addCase(deletePosttoServer.pending,(state) =>{
                state.isLoading = true
            })
            .addCase(deletePosttoServer.fulfilled,(state, action) =>{
                state.isLoading = false
                state.error = ''
                state.postList = state.postList.filter((post) => post.id !== action.payload.id )
            })
            .addCase(deletePosttoServer.rejected,(state, action) =>{
                state.error = action.payload.error
                state.isLoading = false
                state.postList = []
            })
    }
})

export const {addPostToList, removeFromPost, updatePostList, setSelectedPost} =postSlice.actions

export default postSlice.reducer