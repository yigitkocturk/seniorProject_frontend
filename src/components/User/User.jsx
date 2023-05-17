import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import UserActivity from './UserActivity';
import './User.css';

function User() {
    const userId = JSON.parse(localStorage.getItem('currentUser'));
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [imageData, setImageData] = useState(null);

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
            .then((response) => response.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    setImageData(base64data);
                };
                reader.readAsDataURL(blob);
            })
            .catch((error) => {
                console.error('Blob resmi alınamadı:', error);
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('imageFile', file);

        fetch('/photos', {
            method: 'POST',
            headers: {
                Authorization: localStorage.getItem('tokenKey'),
            },
            body: formData,
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result);
                    // İşlem tamamlandığında yapılması gerekenleri burada gerçekleştirin
                },
                (error) => {
                    console.log(error);
                    // Hata durumunda yapılması gerekenleri burada gerçekleştirin
                }
            );
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
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <div className="bg-secondary d-lg-inline-block pt-3 pb-1 rounded">
                                                <h4 className="h4 text-white mb-0">
                                                    <p style={{ paddingLeft: '30px' }}>Upload your profile photo.</p>
                                                </h4>
                                            </div>
                                            <div className="text-center">
                                                <div className="square position-relative display-2 mb-3">
                                                    {imageData && (
                                                        <img
                                                        src={`data:image/jpeg;base64,${imageData}`}
                                                            alt="Profile Photo"
                                                            style={{ height: '250px', width: '250px' }}
                                                        />
                                                    )}
                                                </div>
                                                <input type="file" id="customFile" name="file" hidden="" onChange={handleFileChange} />
                                                <label htmlFor="customFile" className="btn btn-success-soft">
                                                    Upload
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5 mb-xxl-0">
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h3 text-white mb-0 ">
                                                    {user.name} {user.surname}
                                                </h3>
                                            </div>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2">Name:</span>
                                                    {user.name}
                                                </li>
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2">Surname:</span>
                                                    {user.surname}
                                                </li>
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2">Email:</span>
                                                    {user.email}
                                                </li>
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className="display-26 text-secondary me-2">Username:</span>
                                                    {user.userName}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-8 mt-5">
                        <UserActivity />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
