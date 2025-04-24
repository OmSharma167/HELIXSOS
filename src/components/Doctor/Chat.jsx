import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const SOCKET_URL = 'http://localhost:5000';
const API_BASE_URL = 'http://localhost:5000/api';

const Chat = ({ doctorId }) => {
  const { auth } = useAuth();
  const userId = auth.user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const markMessageAsRead = useCallback(async (messageId) => {
    try {
      await axios.put(`${API_BASE_URL}/messages/markAsRead/${userId}/${doctorId}`);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }, [userId, doctorId]);

  useEffect(() => {
    if (!doctorId) {
      setError('Invalid doctor selected');
    }
    if (!userId) {
      setError('User authentication required');
    }
  }, [doctorId, userId]);

  useEffect(() => {
    if (!doctorId || !userId) return;

    socketRef.current = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket']
    });

    const roomId = `chat_${doctorId}_${userId}`;
    
    socketRef.current.on('connect', () => {
      socketRef.current.emit('joinRoom', roomId);
    });

    socketRef.current.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
      if (message.recipientId === userId) {
        markMessageAsRead(message._id);
      }
    });

    socketRef.current.on('userTyping', () => {
      setIsTyping(true);
    });

    socketRef.current.on('userStoppedTyping', () => {
      setIsTyping(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leaveRoom', roomId);
        socketRef.current.disconnect();
      }
    };
  }, [userId, doctorId, markMessageAsRead]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !doctorId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/messages/${userId}/${doctorId}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, doctorId]);

  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit('typing', { roomId: `chat_${doctorId}_${userId}` });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit('stopTyping', { roomId: `chat_${doctorId}_${userId}` });
      }, 1000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !userId || !doctorId) {
      if (!userId || !doctorId) setError('Missing user or doctor information');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/messages/send`, {
        senderId: userId,
        recipientId: doctorId,
        content: newMessage.trim()
      });

      if (!response.data.message?.recipientId) {
        throw new Error('Invalid server response');
      }

      if (socketRef.current) {
        socketRef.current.emit('sendMessage', response.data.message);
      }

      setMessages(prev => [...prev, response.data.message]);
      setNewMessage('');
    } catch (error) {
      setError(error.message || 'Failed to send message');
    }
  };

  useEffect(() => {
    const smoothScroll = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    smoothScroll();
    const timeoutId = setTimeout(smoothScroll, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[400px] w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {error && (
        <div className="m-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.senderId === userId;
          const showDate = index === 0 || 
            new Date(message.timestamp).toDateString() !== 
            new Date(messages[index - 1].timestamp).toDateString();

          return (
            <React.Fragment key={message._id || index}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {new Date(message.timestamp).toLocaleDateString([], { 
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
              <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="break-words text-sm md:text-base">{message.content}</p>
                  <span className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'} mt-1 block`}>
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-sm">Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-gray-300 p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;