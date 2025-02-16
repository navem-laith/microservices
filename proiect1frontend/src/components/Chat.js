import React, { useEffect, useState } from 'react';
import WebSocketService from '../services/WebSocketService';
import axios from 'axios';

const Chat = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                // chat_spring or localhost
                const response = await axios.get(`http://localhost:8089/chat/history/${userId}`);
                setMessages(response.data);
                console.log("fetched message history: ");
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
            }
        };

        fetchChatHistory();

        WebSocketService.connect(userId, (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            WebSocketService.disconnect();
        };
    }, [userId]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') {
            setError('Message cannot be empty');
            return;
        }

        const message = {
            sender: 'admin', // Admin is the sender
            content: inputMessage.trim(),
            userId,
        };
        WebSocketService.sendMessage(message);
        setInputMessage('');
        setError('');
    };

    return (
        <div>
            <h2>Chat with User {userId}</h2>
            <div>
                <div className="message-box">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender}: </strong>
                            <span>{msg.content}</span>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Chat;
// import React, { useEffect, useState } from 'react';
// import WebSocketService from '../services/WebSocketService';

// const Chat = ({ userId }) => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const [error, setError] = useState('');

//     useEffect(() => {
//         WebSocketService.connect(userId, (newMessage) => {
//             setMessages((prevMessages) => [...prevMessages, newMessage]);
//         });

//         return () => {
//             WebSocketService.disconnect();
//         };
//     }, [userId]);

//     const handleSendMessage = () => {
//         if (inputMessage.trim() === '') {
//             setError('Message cannot be empty');
//             return;
//         }

//         const message = {
//             sender: userId,
//             content: inputMessage.trim(),
//         };
//         WebSocketService.sendMessage(message);
//         setInputMessage('');
//         setError('');
//     };

//     return (
//         <div>
//             <h2>Chat</h2>
//             <div>
//                 <div className="message-box">
//                     {messages.map((msg, index) => (
//                         <div key={index}>
//                             <strong>{msg.sender}: </strong>
//                             <span>{msg.content}</span>
//                         </div>
//                     ))}
//                 </div>
//                 <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Type a message..."
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Chat;
