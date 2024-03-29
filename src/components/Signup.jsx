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
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="vh-100 gradient-custom" style={{ backgroundColor: '#a6c1bd' }}>
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Sign Up</h3>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>İsim</Form.Label>
                    <Form.Control type="text" placeholder="Adınız Giriniz" onChange={(e) => handleName(e.target.value)} value={name} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicName" >
                    <Form.Label>Soyisim</Form.Label>
                    <Form.Control type="text" placeholder="Soyadınız Giriniz" onChange={(e) => handleSurname(e.target.value)} value={surname} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Kullanıcı Adı</Form.Label>
                    <Form.Control type="text" placeholder="Kullanıcı Adınızı Giriniz" onChange={(e) => handleUserName(e.target.value)} value={userName} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mail Adresi</Form.Label>
                    <Form.Control type="email" placeholder="Mail Adresinizi Giriniz" onChange={(e) => handleEmail(e.target.value)} value={email} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Şifre</Form.Label>
                    <Form.Control type="password" placeholder="Şifrenizi  Giriniz" onChange={(e) => handlePassword(e.target.value)} value={password} />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                      Kayıt Ol
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