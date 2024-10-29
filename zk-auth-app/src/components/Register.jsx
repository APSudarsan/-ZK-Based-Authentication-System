import React, { useState, useEffect } from 'react';
import initWasm, { get_pass_hash } from '../pkg/zk_wasm.js';

const Register = ({ users, setUsers, setShowLogin }) => {
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

        if (users.find(user => user.username === username)) {
            alert("User already exists!");
            return;
        }

        const hashedPassword = get_pass_hash(password);
        const newUser = { username, hashedPassword };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert("User registered successfully!");

        setUsername('');
        setPassword('');
        setShowLogin(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-sm bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold">Create Your ZK Auth Account</h2>
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
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
                        Sign up
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>Already have an account?{' '}
                        <button
                            onClick={() => setShowLogin(true)}
                            className="text-blue-500 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
