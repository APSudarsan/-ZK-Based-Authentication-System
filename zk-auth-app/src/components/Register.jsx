// src/components/Register.js
import React, { useState, useEffect } from 'react';
import initWasm, { get_pass_hash } from '../pkg/zk_wasm.js';

const Register = ({ users, setUsers }) => { // Accept users and setUsers as props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [wasmLoaded, setWasmLoaded] = useState(false);

    useEffect(() => {
        const loadWasm = async () => {
            await initWasm();
            setWasmLoaded(true);
        };
        loadWasm();
    }, []);

    const saveUser = async (newUser) => {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const savedUser = await response.json();
            setUsers(prevUsers => [...prevUsers, savedUser]); // Update state with new user
            return savedUser;
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!wasmLoaded) {
            alert('WASM module not loaded yet.');
            return;
        }

        if (!username || !password) {
            alert("Username and password are required.");
            return;
        }

        // Check if user already exists
        if (users.find(user => user.username === username)) {
            alert("User already exists!");
            return;
        }

        // Generate password hash using WASM
        const hashedPassword = get_pass_hash(password);

        // Create new user object
        const newUser = { username, hashedPassword };

        // Save user
        await saveUser(newUser);
        alert("User registered successfully!");
        setUsername('');
        setPassword('');
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
