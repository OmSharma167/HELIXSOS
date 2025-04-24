import React, { useState } from 'react';
import { Phone, MessageSquare, Calendar, FileText, HelpCircle } from 'lucide-react';

const DoctorContactSection = ({ doctor, token }) => {
  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSendMessage = async () => {
    if (!message || !selectedOption) {
      alert('Please select a topic and enter your message.');
      return;
    }
    // Implement the API call to send the message
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${doctor._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message, topic: selectedOption })
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setMessage('');
        setSelectedOption('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div>
      
      <div className="space-y-4">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center">
          <Phone className="mr-2 h-4 w-4" /> Call Now
        </button>
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center">
          <Calendar className="mr-2 h-4 w-4" /> Schedule Video Consultation
        </button>
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Send a Message</h3>
          <select 
            value={selectedOption} 
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select a topic</option>
            <option value="health_problem">Discuss a Health Problem</option>
            <option value="medication_query">Medication Query</option>
            <option value="follow_up">Follow-up Question</option>
            <option value="appointment_request">Request Appointment</option>
            <option value="general_advice">General Medical Advice</option>
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-2 mb-2 border rounded h-24"
          />
          <button 
            onClick={handleSendMessage}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Send Message
          </button>
        </div>
        <button className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-50 flex items-center justify-center">
          <FileText className="mr-2 h-4 w-4" /> Share Medical Records
        </button>
        <button className="w-full border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-50 flex items-center justify-center">
          <HelpCircle className="mr-2 h-4 w-4" /> Request Second Opinion
        </button>
      </div>
    </div>
  );
};

export default DoctorContactSection;