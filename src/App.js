
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import User from './components/User/User';
import ChatRoom from './components/chatrooms/Chatrooms';
import UserView from './components/User/UserView';




function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/auth' element={<Signup />}></Route>
        <Route exact path="/users" element={<UserView  />}></Route>
        <Route path="/login" element={localStorage.getItem("currentUser") != null ? <Navigate to="/" /> : <Login />}></Route>
        <Route exact path="/chatrooms" element={<ChatRoom  />}></Route>
      </Routes>
    </div>
  );
}

export default App;