import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import photo from './images/last.jpeg'
import logo from './images/logo.jpeg'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCardTitle
}
    from 'mdb-react-ui-kit';

function Login() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    let history = useNavigate();

    const handleUsername = (value) => {
        setUserName(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = () => {
        fetch(("/auth/login"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                userName: userName,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", userName)
            })
            .catch((err) => console.log(err))
    }

    const handleButton = () => {
        sendRequest()
        setUserName("")
        setPassword("")
        console.log(localStorage)
        history('/')
    }

    const handleNavigate = () => {
        history("/auth")
    }

    return (
        <div style={{ backgroundColor: '#fafafa' }}>
            <MDBContainer style={{ width: '900px', paddingTop: '50px', paddingBottom: '70px', }}>
                <MDBCard style={{ borderRadius: '80px', backgroundColor: '#f4f4f4'}}>

                    <MDBRow className='g-0 d-flex align-items-center'>

                        <MDBCol md='4'>
                            <MDBCardImage src={photo} alt='phone' style={{ height: '600px', borderRadius: '35px' }} fluid />
                        </MDBCol>
                        <MDBCol md='8'>
                            <MDBCardTitle style={{ marginLeft: '200px', color: '#0d6efd', fontSize: '30px',  }}>SHARE CIRCLE</MDBCardTitle>
                            <MDBCardImage src={logo} alt='logo'  style={{ width: '180px', height: '180px', marginLeft: '200px', marginTop: '15px',  borderRadius: '65px' }} />
                            <MDBCardBody style={{ width: '300px', marginLeft: '150px' }}>
                                <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='username' onChange={(i) => handleUsername(i.target.value)} />
                                <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(i) => handlePassword(i.target.value)} />
                                <MDBBtn className="mb-4 w-100" onClick={handleButton}>Sign in</MDBBtn>
                                <MDBCardTitle>
                                    <p style={{paddingLeft: '28px',  color: '#0d6efd'}}>Don't have an account?</p>
                                    <MDBBtn className="mb-4 w-100 mt-3" onClick={handleNavigate}>Sign Up</MDBBtn>
                                </MDBCardTitle>
                            </MDBCardBody>
                        </MDBCol>

                    </MDBRow>

                </MDBCard>
            </MDBContainer>
        </div>
    );
}

export default Login;