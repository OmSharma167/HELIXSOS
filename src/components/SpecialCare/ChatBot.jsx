
import React, { useState, useCallback, useEffect } from 'react';
import { Send, Trash2, Bot, User, Heart, AlertCircle, FolderOpen, Search, Save, X } from 'lucide-react';


const HealthConsultationInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedChats, setSavedChats] = useState({});
  const [currentChatTitle, setCurrentChatTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  
  

  // Load saved chats from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('healthChatHistory');
    if (savedData) {
      setSavedChats(JSON.parse(savedData));
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('healthChatHistory', JSON.stringify(savedChats));
  }, [savedChats]);

  const GEMINI_API_KEY = "AIzaSyD5LzD14to-tQWALMfya2E_I5OvT08qiaU"; //AIzaSyD5LzD14to-tQWALMfya2E_I5OvT08qwer

  const fetchAIResponse = useCallback(async (prompt) => {
    const promptWithDisclaimer = `As an AI assistant, I can provide general health information and suggestions, but this should not be considered medical advice. Please consult healthcare professionals for specific medical concerns. Query: ${prompt}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptWithDisclaimer }] }]
          })
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 
             "I couldn't fetch a response. Try again later.";
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }, [GEMINI_API_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const newMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const aiResponse = await fetchAIResponse(inputMessage);
      const newMessages = [...messages, newMessage, {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      }];
      setMessages(newMessages);
      setShowSaveDialog(true);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "There was an error processing your request. Please try again later.",
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChat = () => {
    if (!currentChatTitle.trim()) return;
    
    setSavedChats(prev => ({
      ...prev,
      [currentChatTitle]: {
        messages: messages,
        timestamp: new Date().toISOString(),
        firstQuestion: messages[0]?.content || ''
      }
    }));
    
    setShowSaveDialog(false);
    setCurrentChatTitle('');
  };

  const loadChat = (title) => {
    if (savedChats[title]) {
      setMessages(savedChats[title].messages);
      setCurrentChatTitle(title);
    }
  };

  const deleteChat = (title, e) => {
    e.stopPropagation();
    const newSavedChats = { ...savedChats };
    delete newSavedChats[title];
    setSavedChats(newSavedChats);
  };

  const filteredChats = Object.entries(savedChats)
    .filter(([title]) => 
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      savedChats[title].firstQuestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Chat history sidebar component
  const ChatHistory = () => (
    <div className="lg:w-64 md:w-32 sm:w-20 bg-gray-50 p-4 border-r border-gray-200 overflow-y-auto">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pr-8 border rounded-lg"
          />
          <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="space-y-2">
        {filteredChats.map(([title, chat]) => (
          <div
            key={title}
            onClick={() => loadChat(title)}
            className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer relative group"
          >
            <div className="font-medium truncate">{title}</div>
            <div className="text-sm text-gray-500 truncate">
              {new Date(chat.timestamp).toLocaleDateString()}
            </div>
            <button
              onClick={(e) => deleteChat(title, e)}
              className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
            >
              <X size={16} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Save dialog component
  const SaveDialog = () => (
    showSaveDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg w-96">
          <h3 className="text-lg font-medium mb-4">Save Chat</h3>
          <input
            type="text"
            placeholder="Enter chat title..."
            value={currentChatTitle}
            onChange={(e) => setCurrentChatTitle(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChat}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="flex h-screen">
      <ChatHistory />
      
      <div className="flex-1 flex flex-col h-screen max-w-4xl p-4">

        {/* Medical Disclaimer */}
        <div className="mb-4 flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-blue-800">
            This AI assistant provides general health information only. Always
            consult healthcare professionals for medical advice.
          </span>
        </div>

        
        

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              Ask any general health-related questions
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.role === 'user' ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    {message.role === 'user' ? (
                      <User size={20} className="text-green-600" />
                    ) : (
                      <Bot size={20} className="text-gray-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-gray-200'
                  }`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-200">
                <Bot size={20} className="text-gray-600" />
              </div>
              <div className="p-3 rounded-lg bg-white border border-gray-200">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your health-related question..."
            className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      <SaveDialog />
    </div>
  );
};

export default HealthConsultationInterface;