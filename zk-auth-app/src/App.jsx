// src/App.js
import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
    const [users, setUsers] = useState([]);

    // Fetch users initially
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Authentication App</h1>
            <Register users={users} setUsers={setUsers} /> {/* Pass users and setUsers */}
            <Login users={users} />
        </div>
    );
};

export default App;
