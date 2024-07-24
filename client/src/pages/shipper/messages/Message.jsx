import React, { useState, useEffect, useRef } from 'react';

const Message = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const chatboxRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            setMessages(selectedUser.messages);
        }
    }, [selectedUser]);

    const addUserMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUser: true }
        ]);
        scrollToBottom();
    };

    const addBotMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isUser: false }
        ]);
        scrollToBottom();
    };

    const respondToUser = (userMessage) => {
        setTimeout(() => {
            addBotMessage("This is a response from the chatbot.");
        }, 500);
    };

    const handleSendMessage = () => {
        if (userInput.trim() !== "") {
            addUserMessage(userInput);
            respondToUser(userInput);
            setUserInput("");
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const scrollToBottom = () => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    };

    return (
        <div className="flex-grow bg-gray-900 text-white flex flex-col">
            <div className="p-4 h-80 overflow-y-auto flex-grow bg-gray-800 rounded-lg shadow-inner" ref={chatboxRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : ''}`}>
                        <p className={`${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'} rounded-lg py-2 px-4 inline-block max-w-xs break-words`}>
                            {msg.text}
                        </p>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-700 flex">
                <input
                    id="user-input"
                    type="text"
                    placeholder="Type a message"
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button
                    id="send-button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Message;
