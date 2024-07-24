import React, { useState } from 'react';

const UserList = ({ users, onSelectUser }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-64 bg-gray-800 text-white h-full shadow-lg flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Chats</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    className="mt-2 w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="p-4 overflow-y-auto flex-grow">
                {filteredUsers.map((user, index) => (
                    <div 
                        key={index} 
                        className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded transition duration-300 flex items-center"
                        onClick={() => onSelectUser(user)}
                    >
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold">{user.name[0]}</span>
                        </div>
                        <span className="ml-3">{user.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
