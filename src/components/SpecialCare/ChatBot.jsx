import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Send,
  Trash2,
  Bot,
  User,
  Heart,
  AlertCircle,
  FolderOpen,
  Search,
  Save,
  X,
  Menu,
  ArrowLeft,
  Loader,
} from "lucide-react";

const HealthConsultationInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedChats, setSavedChats] = useState({});
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Load saved chats from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("healthChatHistory");
    if (savedData) {
      setSavedChats(JSON.parse(savedData));
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("healthChatHistory", JSON.stringify(savedChats));
  }, [savedChats]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const GEMINI_API_KEY = "AIzaSyD5LzD14to-tQWALMfya2E_I5OvT08qiaU";

  const fetchAIResponse = useCallback(
    async (prompt) => {
      const promptWithDisclaimer = `As an AI assistant, I can provide general health information and suggestions, but this should not be considered medical advice. Please consult healthcare professionals for specific medical concerns. Query: ${prompt}`;

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptWithDisclaimer }] }],
            }),
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        return (
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I couldn't fetch a response. Try again later."
        );
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    [GEMINI_API_KEY]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const newMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const aiResponse = await fetchAIResponse(inputMessage);
      const newMessages = [
        ...messages,
        newMessage,
        {
          role: "assistant",
          content: aiResponse,
          timestamp: new Date().toISOString(),
        },
      ];
      setMessages(newMessages);

      // Only show save dialog if this is a new conversation
      if (currentChatTitle === "") {
        setShowSaveDialog(true);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "There was an error processing your request. Please try again later.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChat = () => {
    if (!currentChatTitle.trim()) return;

    setSavedChats((prev) => ({
      ...prev,
      [currentChatTitle]: {
        messages: messages,
        timestamp: new Date().toISOString(),
        firstQuestion: messages[0]?.content || "",
      },
    }));

    setShowSaveDialog(false);
  };

  const loadChat = (title) => {
    if (savedChats[title]) {
      setMessages(savedChats[title].messages);
      setCurrentChatTitle(title);
      // Close sidebar on mobile after selecting a chat
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    }
  };

  const deleteChat = (title, e) => {
    e.stopPropagation();
    const newSavedChats = { ...savedChats };
    delete newSavedChats[title];
    setSavedChats(newSavedChats);
  };

  const startNewChat = () => {
    setMessages([]);
    setCurrentChatTitle("");
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const filteredChats = Object.entries(savedChats)
    .filter(
      ([title]) =>
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        savedChats[title].firstQuestion
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b[1].timestamp) - new Date(a[1].timestamp)); // Sort by newest first

  // Format timestamp to readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Chat history sidebar component
  const ChatHistory = () => (
    <aside
      className={`${
        sidebarOpen ? "fixed inset-y-0 left-0 z-50" : "hidden"
      } md:relative md:block bg-white border-r border-gray-200 h-full overflow-hidden flex flex-col w-full md:w-72 lg:w-80 transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <FolderOpen size={18} />
          Saved Consultations
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-3 border-b border-gray-200">
        <button
          onClick={startNewChat}
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
        >
          + New Consultation
        </button>
      </div>

      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search consultations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 border rounded-lg text-sm"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X size={14} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filteredChats.length > 0 ? (
          <div className="space-y-1">
            {filteredChats.map(([title, chat]) => (
              <div
                key={title}
                onClick={() => loadChat(title)}
                className={`p-3 rounded-lg hover:bg-gray-100 cursor-pointer relative group ${
                  currentChatTitle === title
                    ? "bg-green-50 border border-green-100"
                    : ""
                }`}
              >
                <div className="font-medium truncate">{title}</div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {chat.firstQuestion}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(chat.timestamp)}
                </div>
                <button
                  onClick={(e) => deleteChat(title, e)}
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-full"
                  aria-label="Delete chat"
                >
                  <Trash2
                    size={16}
                    className="text-gray-400 hover:text-red-500"
                  />
                </button>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center text-gray-500 py-8">
            No consultations match your search
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No saved consultations yet
          </div>
        )}
      </div>
    </aside>
  );

  // Save dialog component
  const SaveDialog = () =>
    showSaveDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Save This Consultation</h3>
          <p className="text-sm text-gray-500 mb-4">
            Give this consultation a name so you can easily find it later.
          </p>
          <input
            type="text"
            placeholder="Enter a title (e.g., Sleep Issues, Diet Questions)..."
            value={currentChatTitle}
            onChange={(e) => setCurrentChatTitle(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChat}
              disabled={!currentChatTitle.trim()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex mt-16 flex-col h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="md:hidden  sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-semibold text-lg">Health Consultation</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ChatHistory />

        {/* Main chat area */}
        <main className="flex-1 flex flex-col h-full max-w-5xl mx-auto w-full p-4">
          {/* Medical Disclaimer */}
          <div className="mb-4 flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
            <span className="text-sm text-blue-800">
              This AI assistant provides general health information only. Always
              consult healthcare professionals for medical advice.
            </span>
          </div>

          {/* Current chat title */}
          {currentChatTitle && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg">
              <h2 className="font-medium text-green-800 flex items-center">
                <FolderOpen size={16} className="mr-2" />
                {currentChatTitle}
              </h2>
            </div>
          )}

          {/* Chat Messages - Using flex-1 to allow it to grow/shrink */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-10">
                <Bot size={40} className="mb-4 text-green-500 opacity-50" />
                <h3 className="text-xl font-medium mb-2">
                  Health Consultation Assistant
                </h3>
                <p className="max-w-md text-gray-500">
                  Ask any general health-related questions for information and
                  guidance.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full ${
                        message.role === "user" ? "bg-green-500" : "bg-gray-200"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User size={16} className="text-white" />
                      ) : (
                        <Bot size={16} className="text-gray-700" />
                      )}
                    </div>
                    <div
                      className={`py-3 px-4 rounded-2xl ${
                        message.role === "user"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <div
                        className={`text-xs mt-1 text-right ${
                          message.role === "user"
                            ? "text-green-100"
                            : "text-gray-400"
                        }`}
                      >
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-gray-200">
                    <Bot size={16} className="text-gray-700" />
                  </div>
                  <div className="py-3 px-4 rounded-2xl bg-gray-100">
                    <div className="flex gap-1 items-center">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form - Fixed at the bottom */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 sticky bottom-4 z-10"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your health question..."
              className="flex-1 p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              aria-label="Send message"
            >
              {loading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>
        </main>
      </div>

      <SaveDialog />
    </div>
  );
};

export default HealthConsultationInterface;
