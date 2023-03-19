import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSelectedPost } from '../slices/postSlice'

function UpdatePost() {
    const {selectedPost} = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const[id, setId] = useState(0)

    useEffect(() =>{
        setTitle(selectedPost.title)
        setBody(selectedPost.body)
        setId(selectedPost.id)
    },[selectedPost])

    const updatePost = (e) =>{
        e.preventDefault()
        dispatch(setSelectedPost({id,title,body}))
        navigate('/')
    }

   
  return (
    <div>
        <div className="container mt-3">
        <h2>Update Post</h2>
        <form>
            <div className="mb-3 mt-3">
            <label htmlFor="title">Title:</label>
            <input type="text" className="form-control" id="title" placeholder="update Post title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3">
            <label htmlFor="body">body:</label>
            <input type="text" className="form-control" id="body" placeholder="update body" name="body" value={body} onChange={(e) => setBody(e.target.value)}/>
            </div>
            <button type="submit" onClick={updatePost} className="btn btn-primary">Submit</button>
        </form>
        </div>

    </div>
  )
}

export default UpdatePost