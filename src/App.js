import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ChatRoom from './components/chatrooms/Chatpage';
import UserView from './components/User/UserView';

function App() {
  const currentUser = localStorage.getItem('currentUser');
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    if (currentUser) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Signup />} />
        <Route path="/users" element={currentUser ? <UserView /> : handleNavigateToLogin} />
        <Route path="/login" element={currentUser ? navigate('/') : <Login />} />
        <Route path="/chatrooms" element={currentUser ? <ChatRoom /> : handleNavigateToLogin} />
      </Routes>
    </div>
  );
}

export default App;
