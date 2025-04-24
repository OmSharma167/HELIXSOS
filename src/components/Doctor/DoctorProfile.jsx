

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  DollarSign,
  MessageCircle,
  Star,
} from "lucide-react";
import axios from "axios";
import BookAppointment from "../Doctor/BookAppointment";
import ReviewRating from "./ReviewRating";
import DoctorContactSection from "../Doctor/DoctorContactSection";
import Chat from "../Doctor/Chat";

const DoctorProfile = () => {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("booking");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/${doctorId}`
        );
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load doctor information");
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-center text-lg md:text-2xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 gap-6 lg:gap-8">
          {/* Left Column - Image and Quick Info */}
          <div className="w-full lg:w-1/3">
            {/* Profile Image */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-4 sm:mb-6">
              <img
                src={doctor.imageUrl}
                alt={`${doctor.name}'s profile`}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-blue-50 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-500 flex-shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium truncate">{doctor.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="text-blue-500 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{doctor.experience} years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign
                    className="text-blue-500 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="font-medium">${doctor.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-blue-500 flex-shrink-0" size={20} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Working Hours</p>
                    <p className="font-medium truncate">{doctor.timing}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="w-full lg:w-2/3">
            {/* Doctor Info */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {doctor.name}
              </h1>
              <p className="text-lg sm:text-xl text-blue-600 mb-4">
                {doctor.specialization}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {doctor.bio}
              </p>
            </div>

            {/* Tabs Navigation - Scrollable on mobile */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex border-b mb-6 min-w-max sm:min-w-0">
                {[
                  {
                    id: "booking",
                    icon: <Calendar size={18} />,
                    label: "Book Appointment",
                  },
                  { id: "reviews", icon: <Star size={18} />, label: "Reviews" },
                  {
                    id: "contact",
                    icon: <MapPin size={18} />,
                    label: "Contact",
                  },
                  {
                    id: "chat",
                    icon: <MessageCircle size={18} />,
                    label: "Chat",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-2 py-3 px-4 sm:px-6 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span className="text-sm sm:text-base">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
              {activeTab === "booking" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Book an Appointment
                  </h2>
                  <BookAppointment doctorId={doctorId} />
                </div>
              )}
              {activeTab === "reviews" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Reviews and Ratings
                  </h2>
                  <ReviewRating doctorId={doctorId} />
                </div>
              )}
              {activeTab === "contact" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Contact {doctor.name}
                  </h2>
                  <DoctorContactSection doctor={doctor} />
                </div>
              )}
              {activeTab === "chat" && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">
                    Chat with {doctor.name}
                  </h2>
                  <Chat doctorId={doctorId} userId={userId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
