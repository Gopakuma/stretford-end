import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const Chat = () => {
    const {user} = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sender, setSender] = useState(user);
    const [group, setGroup] = useState('community');
    const wsRef = useRef(null);

    useEffect(() => {
        // Connect to WebSocket
        wsRef.current = new WebSocket(`ws://localhost:${3000}`);
        
        wsRef.current.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            
            // Only show messages for current group
            if (msg.group === group) {
                setMessages(prev => [...prev, msg]);
            }
        };
        
        wsRef.current.onopen = () => {
            console.log('WebSocket connected');
        };
        
        wsRef.current.onclose = () => {
            console.log('WebSocket disconnected');
        };
        
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [group]); // Reconnect when group changes

    const handleSend = () => {
        if (!input.trim()) return;
        
        axios.post('http://localhost:3000/message', {
            sender,
            content: input,
            group
        });
        
        setInput('');
    };

    const changeGroup = (newGroup) => {
        setGroup(newGroup);
        setMessages([]); // Clear messages when switching groups
    };

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <h2>Group Chat: {group}</h2>
                <div>
                    <button onClick={() => changeGroup('community')}>Community</button>
                    <button onClick={() => changeGroup('team')}>Team</button>
                    <button onClick={() => changeGroup('support')}>Support</button>
                </div>
            </div>
            
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                        <strong>{msg.sender}:</strong> {msg.content}
                        <div style={{ fontSize: '0.8em', color: '#666' }}>
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
            </div>
            
            <div style={{ marginTop: '10px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{ width: '70%', padding: '8px' }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} style={{ padding: '8px 15px' }}>Send</button>
            </div>
            
            <div style={{ marginTop: '10px' }}>
                <label>
                    Your Name: 
                    <input 
                        type="text" 
                        value={sender} 
                        onChange={(e) => setSender(e.target.value)} 
                        style={{ marginLeft: '5px' }}
                    />
                </label>
            </div>
        </div>
    );
};

export default Chat;