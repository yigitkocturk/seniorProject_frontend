import React, { useEffect, useState } from 'react';
import logo from './images/logo.png';
import nullUserImage from './images/nulluser.jpg'; // Varsayılan profil fotoğrafı
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const userId = JSON.parse(localStorage.getItem('currentUser'));
  const [imageData, setImageData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/photos?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('tokenKey'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setImageData(data.image);
      })
      .catch((error) => {
        console.error('Blob resmi alınamadı:', error);
      });
  }, [userId]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light  fixed-top"
        style={{ height: '60px', backgroundColor: '#a6c1bd' }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-1 mt-lg-0" href="/">
              <img src={logo} height="50" alt="MDB Logo" loading="lazy" style={{  borderRadius: "15px"}}/>
            </a>
            <div className="d-flex align-items-center justify-content-center rounded">
              <a href="/" style={{ textDecoration: 'none' }}>
                <p
                  style={{
                    paddingTop: '10px',
                    fontSize: '35px',
                    color: '#fff',
                    paddingLeft: '750px',
                    fontFamily: 'Fantasy',
            
                  }}
                >
                  Share Circle
                </p>
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <a href="/chatrooms" style={{ marginRight: '10px', color: 'white'}}>
                <i className="far fa-comments fa-lg" ></i>
              </a>
            </div>
            <div className="dropdown" style={{display: "inline-block", border:" 2px solid white", borderRadius: "50%"}}>
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                backgroundColor= "#fff"
              >
                {imageData ? (
                  <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    className="rounded-circle"
                    height="50"
                    width="60"
                    alt="Profile Photo"
                    loading="lazy"
                    backgroundColor= "#fff"
                  />
                ) : (
                  <img
                    src={nullUserImage}
                    className="rounded-circle"
                    height="50"
                    width="60"
                    alt="Profile Photo"
                    loading="lazy"
                  />
                )}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="/users">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
