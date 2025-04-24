import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import VideoConsultation from "./components/Telemedicine/VideoConsultation";
import AppointmentBooking from "./components/Telemedicine/AppointmentBooking";
import PharmacyLocator from "./components/Pharmacy/PharmacyLocator";
import PriceComparison from "./components/Pharmacy/PriceComparison";
import SOSButton from "./components/Emergency/SOSButton";
import HospitalLocator from "./components/Emergency/HospitalLocator";

import Home from "./components/Layout/Home";
import Register from "./components/Form/Register";
import Login from "./components/Form/Login";
import DoctorList from "./components/Doctor/DoctorList";
import DoctorProfile from "./components/Doctor/DoctorProfile";
import DoctorForm from "./components/Doctor/DoctorForm";
import {
  AddDoctorNote,
  DoctorReports,
  UploadReport,
  UserReports,
} from "./components/Report/AllFile";
import NearbyHealthcare from "./components/Location/NearbyHealthcare";

import UserPanel from "./components/userPanel/UserDashboard";
import AdminDashboard from "./components/DoctorDashboard/Dashboard";
import { AuthProvider } from "./context/authContext";
import UserDashboard from "./pages/UserDashboard";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import NearbyPoliceChauks from "./components/Police/NearbyPoliceChauks";
import PoliceChaukRegistration from "./components/Police/PoliceChaukRegistration";
import EmergencyDashboard from "./components/Police/EmergencyDashboard";
import AmbulanceRequestSystem from "./components/Ambulance/AmbulanceRequestSystem";
import AmbulanceOwnerRequests from "./components/Ambulance/AmbulanceOwnerRequests";
import AmbulanceRegistration from "./components/Ambulance/AmbulanceRegistration";
import OurServicesSection from "./components/Layout/OurServicesSection";

import Chat from "./components/Doctor/Chat";
import HealthConsultationInterface from "./components/SpecialCare/ChatBot";

import Disease from "./components/Heart_disease/disease";
import PoliceStationDashboard from "./components/PoliceDashboard/PoliceStationDashboard";
import AmbulanceDashboard from "./components/Ambulance/AmbulanceDashboard";


function App() {
  return (
    

    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow p-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/video-consultation"
                element={<VideoConsultation />}
              />
              <Route
                path="/appointment-booking"
                element={<AppointmentBooking />}
              />
              <Route path="/pharmacy-locator" element={<PharmacyLocator />} />
              <Route path="/our-services" element={<OurServicesSection />} />
              <Route path="/price-comparison" element={<PriceComparison />} />
              <Route path="/sos" element={<SOSButton />} />
              <Route path="/hospital-locator" element={<HospitalLocator />} />
              {/* <Route path="/Chat-bot" element={<HealthConsultationInterface />} /> */}
              <Route
                path="/chat-bot"
                element={<HealthConsultationInterface />}
              />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/DoctorList" element={<DoctorList />} />
              <Route path="/doctors/:id" element={<DoctorProfile />} />
              <Route path="/doctors" element={<DoctorList />} />
              <Route path="/doctorform" element={<DoctorForm />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/doctorreports" element={<DoctorReports />} />
              <Route path="/uploadreport" element={<UploadReport />} />
              <Route path="/userreports" element={<UserReports />} />
              <Route path="/adddoctornote" element={<AddDoctorNote />} />
              <Route path="/nearbyhealthcare" element={<NearbyHealthcare />} />
              <Route path="/user-panel" element={<UserPanel />} />
              <Route
                path="/admin/dashboard/:doctorId"
                element={<AdminDashboard />}
              />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route
                path="/NearbyPoliceChauks"
                element={<NearbyPoliceChauks />}
              />
              <Route
                path="/PoliceChaukRegistration"
                element={<PoliceChaukRegistration />}
              />
              <Route
                path="/EmergencyDashboard"
                element={<EmergencyDashboard />}
              />
              <Route
                path="/AmbulanceRequestSystem"
                element={<AmbulanceRequestSystem />}
              />
              <Route
                path="/AmbulanceOwnerRequests"
                element={<AmbulanceOwnerRequests />}
              />
              <Route
                path="/AmbulanceRegistration"
                element={<AmbulanceRegistration />}
              />
              <Route path="/disease" element={<Disease />} />
              <Route
                path="/PoliceStationDashboard"
                element={<PoliceStationDashboard />}
              />
              <Route
                path="/AmbulanceDashboard"
                element={<AmbulanceDashboard />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
//PoliceHomepage
