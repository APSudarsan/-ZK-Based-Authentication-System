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
        </div>
    );
};

export default App;
