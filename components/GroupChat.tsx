import React, { useState } from 'react';
import { Send, Users, X } from 'lucide-react';

// Dummy data for chat
const initialMessages = [
    { sender: 'Alice', text: 'Hey team, reminder about the content deadline for next week!', time: '10:30 AM', avatar: 'A' },
    { sender: 'You', text: 'Got it. I have the creatives for the UAE Flag Day campaign ready.', time: '10:31 AM', avatar: 'Y' },
    { sender: 'Bob', text: 'Great! I will review them this afternoon.', time: '10:32 AM', avatar: 'B' },
    { sender: 'Charlie', text: 'Anyone have the analytics from the last campaign?', time: '10:35 AM', avatar: 'C' },
];

const GroupChat: React.FC = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const msg = {
                sender: 'You',
                text: newMessage.trim(),
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                avatar: 'Y'
            };
            setMessages([...messages, msg]);
            setNewMessage('');
        }
    };

    return (
        <div className="fixed top-0 right-0 h-screen w-96 bg-white z-40 flex flex-col border-l border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                   <Users className="h-6 w-6 text-blue-600"/>
                   <h3 className="font-bold text-slate-800">Team Collaboration</h3>
                </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 items-start ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${msg.sender === 'You' ? 'bg-blue-500' : 'bg-green-500'}`}>
                            {msg.avatar}
                        </div>
                        <div className={`p-3 rounded-xl max-w-xs ${msg.sender === 'You' ? 'bg-blue-100 text-slate-800 rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs text-slate-400 mt-1 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-slate-50">
                <div className="relative">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full pr-12 pl-4 py-2 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        aria-label="Chat message input"
                    />
                    <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition" aria-label="Send Message">
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GroupChat;