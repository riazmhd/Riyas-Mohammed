import React, { useState } from 'react';
import { Send, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const initialMessages = [
    { sender: 'Alice', text: 'Hey team, reminder about the content deadline for next week!', time: '10:30 AM', avatar: 'https://i.pravatar.cc/150?u=alice' },
    { sender: 'Riaz', text: 'Got it. I have the creatives for the UAE Flag Day campaign ready.', time: '10:31 AM', avatar: 'https://i.pravatar.cc/150?u=riaz' },
    { sender: 'Bob', text: 'Great! I will review them this afternoon.', time: '10:32 AM', avatar: 'https://i.pravatar.cc/150?u=bob' },
    { sender: 'Charlie', text: 'Anyone have the analytics from the last campaign?', time: '10:35 AM', avatar: 'https://i.pravatar.cc/150?u=charlie' },
];

interface GroupChatProps {
    isOpen: boolean;
}

export const GroupChat: React.FC<GroupChatProps> = ({ isOpen }) => {
    const { user, logActivity } = useAuth();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && user) {
            const msg = {
                sender: user.name,
                text: newMessage.trim(),
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                avatar: user.avatarUrl,
            };
            setMessages([...messages, msg]);
            logActivity(`sent a message: "${newMessage.trim()}"`);
            setNewMessage('');
        }
    };

    const senderIsYou = (sender: string) => {
      return user ? sender === user.name : false;
    }

    return (
        <div className={`fixed top-0 right-0 h-screen w-96 bg-white/30 backdrop-blur-2xl z-40 flex flex-col border-l border-white/40 shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/30 bg-black/5">
                <div className="flex items-center gap-3">
                   <Users className="h-6 w-6 text-blue-600"/>
                   <h3 className="font-bold text-slate-800">Team Collaboration</h3>
                </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 items-start ${senderIsYou(msg.sender) ? 'flex-row-reverse' : ''}`}>
                        <img src={msg.avatar} alt={msg.sender} className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
                        <div className={`p-3 rounded-xl max-w-xs shadow-sm ${senderIsYou(msg.sender) ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white/50 text-slate-800 rounded-bl-none'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${senderIsYou(msg.sender) ? 'text-blue-100 text-right' : 'text-slate-400 text-left'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/30 bg-black/5">
                <div className="relative">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={user ? "Type a message..." : "Log in to chat"}
                        className="w-full pr-12 pl-4 py-2 bg-white/50 border border-white/30 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition placeholder:text-slate-500"
                        aria-label="Chat message input"
                        disabled={!user}
                    />
                    <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:bg-slate-400" aria-label="Send Message" disabled={!user || !newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GroupChat;
