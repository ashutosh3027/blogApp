import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp';
import Homepage from './Pages/Homepage';
import NewPost from './Pages/NewPost';
import Post from './Pages/Post';
import EditPost from './Pages/EditPost';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<SignUp/>}></Route>
          <Route exact path='/home' element={<Homepage/>}></Route>
          <Route exact path='/newpost' element={<NewPost/>}></Route>
          <Route exact path='/post/:id' element={<Post/>}></Route>
          <Route exact path='/edit/:id' element={<EditPost/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
