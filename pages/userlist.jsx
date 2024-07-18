import React, { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch users data
    const fetchUsers = async () => {
      try {
        // Make a GET request to the /admin/users endpoint
        const response = await fetch('http://localhost:YOUR_BACKEND_PORT/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers as needed (e.g., authorization token)
          },
        });

        // Check if the request was successful (status code 200)
        if (response.ok) {
          // Parse the response body as JSON
          const data = await response.json();
          // Update the state with the fetched users data
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    // Call the fetchUsers function when the component mounts
    fetchUsers();
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render

  // Render the users list
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
