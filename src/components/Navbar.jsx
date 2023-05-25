import React, { useEffect, useState } from 'react';
import logo from './images/logo.jpeg';

const Navbar = () => {
    const userId = JSON.parse(localStorage.getItem('currentUser'));
  const [imageData, setImageData] = useState('');

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
        })
    })
    
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ height: '60px' }}>
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
              <img
                src={logo}
                height="50"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
            <div className="d-flex align-items-center justify-content-center">
              <a href="/" style={{ textDecoration: 'none' }}>
                <p style={{ paddingTop: "10px", fontSize: "35px", color: "#654E92", paddingLeft: '600px' , fontFamily: 'Fantasy'}}>Share Circle</p>
              </a>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <a
                href='/chatrooms'
                style={{ marginRight: '10px' }}
              >
                <i className="far fa-comments fa-lg"></i>
              </a>
            </div>
            <div className="dropdown">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={`data:image/jpeg;base64,${imageData}`}
                  className="rounded-circle"
                  height="40"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="/users">My profile</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Logout</a>
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
