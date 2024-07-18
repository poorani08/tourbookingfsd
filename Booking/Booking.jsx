import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgrating }) => {
    const { price, reviews, title } = tour;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: "",
        phone: "",
        guestSize: 1,
        bookAt: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalColor, setModalColor] = useState('green');

    const handleChange = e => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10;
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

    const handleClick = async e => {
        e.preventDefault();
        try {
            if (!user || user === undefined || user === null) {
                setModalMessage("Please sign in");
                setModalColor('red');
                setShowModal(true);
                return;
            }
            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            });
            const result = await res.json();
            if (!res.ok) {
                setModalMessage(result.message);
                setModalColor('red');
                setShowModal(true);
                return;
            }
            setModalMessage("Tour booked successfully");
            setModalColor('green');
            setShowModal(true);
            navigate('/thank-you');
        } catch (err) {
            setModalMessage(err.message);
            setModalColor('red');
            setShowModal(true);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>₹{price}<span> /per person</span></h3>
                <span className='d-flex align-items-center'>
                    <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                    {avgrating === 0 ? null : avgrating}({reviews?.length})
                </span>
            </div>

            <div className="booking__form">
                <h5>Information</h5>
                <Form className="booking__info-form" onSubmit={handleClick}>
                    <FormGroup>
                        <input type="text" placeholder="Full name" id="fullName" required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup>
                        <input type="number" placeholder="Phone number" id="phone" required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" id="bookAt" required onChange={handleChange} min={today} />
                        <input type="number" placeholder="Guest" id="guestSize" required onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className="border-0 px-0">
                        <h5 className='d-flex align-items-center gap-1'>
                            ₹{price}<i className="ri-close-line"></i> 1 person
                        </h5>
                        <span>₹{price}</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0">
                        <h5>Service charge</h5>
                        <span>₹10</span>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0 total">
                        <h5>Total</h5>
                        <span>₹{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                <button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</button>
            </div>

            <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className={modalColor === 'green' ? 'modal-success' : 'modal-error'}>
                <ModalHeader toggle={() => setShowModal(!showModal)}>{modalColor === 'green' ? 'Success' : 'Error'}</ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setShowModal(!showModal)}>OK</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Booking;
