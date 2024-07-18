import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined
  });
  const [errorMessage, setErrorMessage] = useState(''); 
  const [modal, setModal] = useState(false); 
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleModal = () => setModal(!modal); 

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.message); 
        toggleModal(); 
      } else {
        dispatch({ type: 'REGISTER_SUCCESS' });
        navigate('/login');
      }
    } catch (err) {
      setErrorMessage(err.message); 
      toggleModal(); 
    }
  };

  return (
    <section className="background">
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2 style={{ color: 'black' }}>Register</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder="Username" required id="userName" onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <input type="email" placeholder="Email" required id="email" onChange={handleChange} />
                  </FormGroup>

                  <FormGroup>
                    <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">Create Account</Button>
                </Form>
                <p>Already have an account? <Link to='/login'>login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal isOpen={modal} toggle={toggleModal} className={errorMessage ? 'error-modal' : ''}>
  <ModalHeader toggle={toggleModal}>Error</ModalHeader>
  <ModalBody>
    {errorMessage}
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={toggleModal}>OK</Button>
  </ModalFooter>
</Modal>

    </section>
  );
}

export default Register;
