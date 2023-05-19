import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import UserActivity from './UserActivity';
import './User.css';

function User() {
    const userId = JSON.parse(localStorage.getItem('currentUser'));
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageData, setImageData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

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
            .then((response) => response.json())  // response.blob() yerine response.json()
            .then((data) => {
                setImageData(data.image);
            })
            .catch((error) => {
                console.error('Blob resmi alınamadı:', error);
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
                    // Yeniden yükleme yapmak veya başka bir işlem yapmak için gerekli adımları burada gerçekleştirin.
                    return response.json(); // Return the response as JSON
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
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-3" style={{ marginTop: '290px' }}>
                <div className="row">
                    <div className="col-4 mt-5">
                        <form className="file-upload">
                            <div className="row mb-5 gx-5">
                                <div>
                                    <div className="bg-secondary-soft px-4 py-5 rounded-lg text-center">
                                        {imageData && (
                                            <img
                                                src={`data:image/jpeg;base64,${imageData}`}  // src özelliği düzeltildi
                                                alt="Profile Photo"
                                                style={{ height: '250px', width: '250px' }}
                                            />

                                        )}
                                        {!imageData && <div>Fotoğraf yok</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4 gx-5">
                                <div className="col">
                                    <input type="file" className="form-control" onChange={handleFileChange} />
                                </div>
                            </div>
                            <div className="row mb-4 gx-5">
                                <div className="col">
                                    <button type="button" className="btn btn-primary" onClick={uploadPhoto}>
                                        Fotoğraf Yükle
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-8 mt-5">
                        <UserActivity user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
