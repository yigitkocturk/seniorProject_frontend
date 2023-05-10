
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Signup';
import Login from './components/Login';




function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/auth' element={<Signup />}></Route>
        <Route path="/login" element={localStorage.getItem("currentUser") != null ? <Navigate to="/" /> : <Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;