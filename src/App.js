import React from 'react';
import './App.css';
import DisplayPosts from './pages/DisplayPosts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPost from './pages/AddPost';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' element={<DisplayPosts/>}/>
        <Route path='/addpost' element={<AddPost/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
