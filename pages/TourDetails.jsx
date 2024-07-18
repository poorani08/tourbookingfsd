import React, { useRef, useState, useEffect, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateavgrating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from '../hooks/usefetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const { photo, title, address, desc, price, reviews, city, distance, maxGroupSize } = tour;

  const { totalrating, avgrating } = calculateavgrating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        setModalMessage("Please sign in");
        setShowModal(true);
      } else {
        const reviewObj = {
          username: user?.username,
          reviewText,
          rating: tourRating
        };
  
        const res = await fetch(`${BASE_URL}/review/${id}`, {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(reviewObj)
        });
  
        const result = await res.json();
        if (!res.ok) {
          return toast.error(result.message);
        }
       
        setModalMessage("Your review has been successfully submitted.");
        setShowModal(true);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <ToastContainer />
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading..</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg='8'>
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className='tour__info'>
                    <h2>{title}</h2>
                    <div className='d-flex align-items-center gap-5'>
                      <span className='d-flex align-items-center gap-1'>
                        <i className="ri-star-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                        {avgrating === 0 ? null : avgrating}
                        {totalrating === 0 ? ('Not rated') : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i>{address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span><i className="ri-map-pin-2-line"></i>{city}</span>
                      <span><i className="ri-money-dollar-circle-line"></i>${price} /per person</span>
                      <span> <i className="ri-money-dollar-circle-line"></i>{distance} k/m</span>
                      <span><i className='ri-group-line'></i>{maxGroupSize} people</span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>1<i className="ri-star-s-fill"></i></span>
                        <span onClick={() => setTourRating(2)}>2<i className="ri-star-s-fill"></i></span>
                        <span onClick={() => setTourRating(3)}>3<i className="ri-star-s-fill"></i></span>
                        <span onClick={() => setTourRating(4)}>4<i className="ri-star-s-fill"></i></span>
                        <span onClick={() => setTourRating(5)}>5<i className="ri-star-s-fill"></i></span>
                      </div>
                      <div className="review__input">
                        <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" required />
                        <button className='btn primary__btn text-white' type="submit">submit</button>
                      </div>
                    </Form>
                    <ListGroup className='user__reviews'>
                      {reviews?.map(review => (
                        <div className='review__item' key={review._id}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className='d-flex align-items-center justify-content-between'>
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {review.rating}<i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg='4'>
                <Booking tour={tour} avgrating={avgrating} />
              </Col>
            </Row>
          )}
        </Container>
        <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)} className="custom-modal">
  <ModalHeader toggle={() => setShowModal(!showModal)}>{modalMessage === "Please sign in" ? "Sign In Required" : "Review Submitted"}</ModalHeader>
  <ModalBody className={modalMessage === "Your review has been successfully submitted." ? "modal-success" : "modal-error"}>
    {modalMessage}
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={() => setShowModal(!showModal)}>OK</Button>
  </ModalFooter>
</Modal>
      </section>
    </>
  );
}

export default TourDetails;
