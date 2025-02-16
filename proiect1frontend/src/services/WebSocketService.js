import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WebSocketService = (() => {
    let client = null;

    const connect = (userId, onMessageReceived) => {
        client = new Client({
            webSocketFactory: () => new SockJS('http://chat.localhost/chat'), // http://localhost:8089
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe(`/topic/chat/${userId}`, (message) => {
                    const parsedMessage = JSON.parse(message.body);
                    onMessageReceived(parsedMessage);
                });
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame.headers['message']);
            },
        });
        client.activate();
    };

    const sendMessage = (message) => {
        if (client && client.connected) {
            client.publish({
                destination: '/app/sendMessage',
                body: JSON.stringify(message),
            });
        } else {
            console.error('WebSocket connection is not established.');
        }
    };

    const disconnect = () => {
        if (client) {
            client.deactivate();
            console.log('Disconnected from WebSocket');
        }
    };

    return { connect, sendMessage, disconnect };
})();

export default WebSocketService;
