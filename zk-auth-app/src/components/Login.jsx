// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import initWasm, { generate_proof, verify_proof } from '../pkg/zk_wasm.js';

const Login = ({ users, setShowLogin }) => {
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

        const user = users.find(user => user.username === username);
        if (!user) {
            alert('User not found.');
            return;
        }

        const proof = await generate_proof(username, password);
        const verified = verify_proof(proof, user.hashedPassword, username);

        if (verified) {
            alert('Login successful!');
        } else {
            alert('Login failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-sm bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Sign in using ZK Auth</h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username or email address"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign in
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>New Here?{' '}
                        <button
                            onClick={() => setShowLogin(false)}
                            className="text-blue-500 hover:underline"
                        >
                            Create an account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
