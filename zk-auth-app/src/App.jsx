import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [users, setUsers] = useState([]);
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="App">
            {showLogin ? (
                <Login users={users} setShowLogin={setShowLogin} />
            ) : (
                <Register users={users} setUsers={setUsers} setShowLogin={setShowLogin} />
            )}
            <footer className="w-full  bottom-0 bg-custom-bg text-center text-sm text-gray-400 py-4 pb-8">
                Designed and Developed by <a href ="https://github.com/APSudarsan/" className="text-blue-500 font-semibold">Sudarsan</a>
            </footer>
        </div>
    );
};

export default App;