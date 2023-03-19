import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPostToList, addPosttoServer } from '../slices/postSlice'

function AddPost() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addPost = (e) =>{
        e.preventDefault()
        console.log({title, body})
        dispatch(addPosttoServer({title, body}))
        navigate('/')
        setTitle('')
        setBody('')
    }
  return (
    <div>
    <div className="container shadow p-3 mt-5">
    <h2>Add Post</h2>
        <form >
            <div className="mb-3 mt-3 form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" id="title" placeholder="Enter Post Name" value={title} name="title" onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="mb-3 form-group">
                <label htmlFor="body">Body:</label>
                <input type="text " className="form-control" id="body" placeholder="Enter password" value={body} name="body" onChange={(e) => setBody(e.target.value)}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-primary' onClick={addPost}>Submit</button>
            </div>
        </form>
    </div>

</div>
  )
}

export default AddPost