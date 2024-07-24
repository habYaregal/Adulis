import React, { useState } from 'react';
import UserList from './UserList';
import Message from './Message';
import ShipperNavigation from '../../../components/ShipperNav';

const ShipperMessage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { name: 'User 1', messages: [{ text: 'Hello from User 1', isUser: false }] },
        { name: 'User 2', messages: [{ text: 'Hello from User 2', isUser: false }] },
        { name: 'User 3', messages: [{ text: 'Hello from User 3', isUser: false }] }
    ];

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <ShipperNavigation />
            <div className="flex flex-grow">
                <UserList users={users} onSelectUser={handleSelectUser} />
                <Message selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default ShipperMessage;
