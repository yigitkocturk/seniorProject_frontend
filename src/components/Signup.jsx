import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let history = useNavigate();



  const handleSubmit = () => {
    savePost();
    setUserName("")
    setPassword("")
    setName("")
    setSurname("")
    setEmail("")
    console.log(localStorage)
    history("/login")
  }
  const handleName = (value) => {
    setName(value);
  }

  const handleSurname = (value) => {
    setSurname(value);
  }

  const handleUserName = (value) => {
    setUserName(value);
  }

  const handleEmail = (value) => {
    setEmail(value);
  }

  const handlePassword = (value) => {
    setPassword(value);
  }

  const savePost = () => {
    fetch(("/auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
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
        localStorage.setItem("name", name)
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="vh-100 gradient-custom" style={{ backgroundColor: '#0d6efd' }}>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Sign Up</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={(e) => handleName(e.target.value)} value={name} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicName" >
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Enter your surname" onChange={(e) => handleSurname(e.target.value)} value={surname} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" onChange={(e) => handleUserName(e.target.value)} value={userName} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => handleEmail(e.target.value)} value={email} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => handlePassword(e.target.value)} value={password} />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                      Sign Up
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;