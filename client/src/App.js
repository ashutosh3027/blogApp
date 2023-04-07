import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          <Route exact path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
