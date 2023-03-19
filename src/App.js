import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPost from './pages/AddPost';
import DisplayPosts from './pages/DisplayPosts';
import UpdatePost from './pages/UpdatePost';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<DisplayPosts/>}/>
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/updatepost' element={<UpdatePost/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
