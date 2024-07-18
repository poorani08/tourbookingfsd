import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BASE_URL } from '../utils/config';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        console.log(`Fetching users from ${BASE_URL}/users`);
        const usersResponse = await fetch(`${BASE_URL}/users`, {
          credentials: 'include',
        });
        if (!usersResponse.ok) {
          throw new Error(`Users request failed with status ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        setUsers(usersData.data);

        console.log(`Fetching tours from ${BASE_URL}/tours`);
        const toursResponse = await fetch(`${BASE_URL}/tours`, {
          credentials: 'include',
        });
        if (!toursResponse.ok) {
          throw new Error(`Tours request failed with status ${toursResponse.status}`);
        }
        const toursData = await toursResponse.json();
        setTours(toursData.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row>
            <Col>
              <h2>Users</h2>
              <ul>
                {users.map(user => (
                  <li key={user._id}>{user.username} - {user.email}</li>
                ))}
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Tours</h2>
              <ul>
                {tours.map(tour => (
                  <li key={tour._id}>{tour.title}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;

