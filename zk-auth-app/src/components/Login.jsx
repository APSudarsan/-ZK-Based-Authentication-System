// src/components/Login.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import initWasm, { generate_proof, verify_proof } from '../pkg/zk_wasm.js';

const Login = ({ users }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [wasmLoaded, setWasmLoaded] = useState(false);

    // Load WASM on mount
    useEffect(() => {
        const loadWasm = async () => {
            await initWasm();
            setWasmLoaded(true);
        };
        loadWasm();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!wasmLoaded) {
            alert('WASM module not loaded yet.');
            return;
        }

        if (!username || !password) {
            alert("Username and password are required.");
            return;
        }

        // Check if user exists
        const user = users.find(user => user.username === username);
        if (!user) {
            alert('User not found.');
            return;
        }

        // Generate proof and verify it
        const proof = await generate_proof(user.username, password); // Update this logic as per your needs
        const verified = verify_proof(proof, user.hashedPassword, user.username);

        if (verified) {
            alert('Login successful!');
        } else {
            alert('Login failed.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
