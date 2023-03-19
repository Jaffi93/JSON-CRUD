import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { getPostsFromServer, setSelectedPost, updatePosttoServer } from '../slices/postSlice'

function DisplayPosts() {
    const {postList, error} = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getPostsFromServer())
    },[])

    const updatePost = (post) =>{
        dispatch(updatePosttoServer(post))
        Navigate('/updatePost')
    }
  return (
    <>
    
    <div className='container'>
        <div className='mt-5'>
            <h2>List of posts</h2>
            <Link href="addPost" className='btn btn-outline-success mb-3 ms-3 '>Add Post</Link>
                <table className="table table-hover table-striped responsive shadow">
                    
                    <thead className='table-success'>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { (error !== '') ? <h5>{error}</h5> : postList.map((post) =>{
                            return(
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                    <button  className="btn" onClick={() => updatePost(post)}><i className="fa-solid fa-pen-to-square me-3"></i></button>
                                    <button  className="btn" onClick={''}><i className="fa-regular fa-trash-can me-3"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
            </div>
        </div>
    </div>
    </>
  )
}

export default DisplayPosts