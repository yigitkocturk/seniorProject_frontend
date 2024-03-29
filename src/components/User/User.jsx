import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import UserActivity from './UserActivity';
import './User.css';
import nullUserImage from '../images/nulluser.jpg';

function User() {
  const userId = JSON.parse(localStorage.getItem('currentUser'));
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    surname: '',
    userName: '',
    email: '',
  });

  useEffect(() => {
    fetchUser(userId);
    fetchBlobImage(userId);
  }, [userId]);

  const fetchUser = (userId) => {
    fetch(`/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('tokenKey'),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result);
          setUpdatedUser(result); // Update the form fields with user data
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
  };

  const fetchBlobImage = (userId) => {
    fetch(`/photos?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('tokenKey'),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Blob resmi alınamadı: ' + response.status);
        }
      })
      .then((data) => {
        setImageData(data.image);
      })
      .catch((error) => {
        console.error('Blob resmi alınamadı:', error);
        setImageData(null);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const uploadPhoto = () => {
    if (!selectedImage) {
      console.error('Lütfen yüklemek için bir fotoğraf seçin.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('imageFile', selectedImage);

    fetch('/photos', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('tokenKey'),
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Fotoğraf başarıyla yüklendi veya güncellendi.');
          return response.json();
        } else {
          throw new Error('Fotoğraf yükleme hatası: ' + response.status);
        }
      })
      .then((data) => {
        // Update the imageData state with the newly uploaded image
        setImageData(data.image);
      })
      .catch((error) => {
        console.error('Fotoğraf yükleme hatası:', error);
      });
  };

  const handleInputChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateUser(userId, updatedUser);
  };

  const updateUser = (userId, updatedUserData) => {
    fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('tokenKey'),
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Kullanıcı güncellendi:', data);
        // Kullanıcı güncellendiğinde ekranı yeniden yükleme veya başka bir işlem yapma adımlarını burada gerçekleştirin.
        setUser(data);
      })
      .catch((error) => {
        console.error('Kullanıcı güncelleme hatası:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="main-body">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                {imageData ? (
                  <img
                    src={`data:image/jpeg;base64,${imageData}`}
                    alt="Profile Photo"
                    style={{ height: '145px', width: '180px' }}
                  />
                ) : (
                  <img
                    src={nullUserImage}
                    alt="Profile Photo"
                    style={{ height: '145px', width: '180px' }}
                  />
                )}
                <div className="mt-3">
                  <h4>{user.userName}</h4>
                  <input type="file" className="form-control" onChange={handleFileChange} style={{ marginTop: '10px' }} />
                  <button type="button" className="btn btn-primary" onClick={uploadPhoto} style={{ marginTop: '10px' }}>
                    Fotoğraf Yükle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Surname</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      name="surname"
                      value={updatedUser.surname}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Username</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      value={updatedUser.userName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-3"></div>
                  <div className="col-sm-9 text-secondary">
                    <button type="submit" className="btn btn-primary">
                      Güncelle
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
