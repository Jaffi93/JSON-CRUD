import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getPostsFromServer, removeFromPost, setSelectedPost } from '../slices/postSlice'
import ReactPaginate from 'react-paginate';

function DisplayPosts() {
    const {postList, error} = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() =>{
        dispatch(getPostsFromServer())
    },[])
    
    const updatePost = (post) =>{
        dispatch(setSelectedPost(post))
        navigate('/updatePost')
    }

    const deletePost = (post) =>{
        dispatch(removeFromPost(post))
    }
    
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 5;  //endoffset 5
    const currentItems = postList.slice(itemOffset, endOffset); //value
    const pageCount = Math.ceil(postList.length / 5);
    const handlePageClick = (e) => {
        const newOffset = (e.selected * 5) % postList.length;
        setItemOffset(newOffset);
        }
  return (
    <>
    
    <div className='container'>
        <div className='mt-5'>
            <h2>List of posts</h2>
            <Link to="addPost" className='btn btn-outline-success mb-3 ms-3 '>Add Post</Link>
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
                        { (error !== '') ? <h5>{error}</h5> : currentItems.map((post) =>{
                            return(
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                    <button  className="btn" onClick={() => updatePost(post)}><i className="fa-solid fa-pen-to-square me-3"></i></button>
                                    <button  className="btn" onClick={() => deletePost(post)}><i className="fa-regular fa-trash-can me-3"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
                />
            </div>
        </div>
    </div>
    </>
  )
}

export default DisplayPosts