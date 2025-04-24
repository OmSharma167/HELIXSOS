import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { Video, Phone, Calendar } from "lucide-react";
import Layout from "../Layout/Layout"; // Make sure Layout has the header and footer correctly structured
import DoctorList from "../Doctor/DoctorList"; // Move DoctorList out of header

const SOCKET_SERVER_URL = "http://localhost:5000"; // Replace with your actual server URL

const VideoConsultation = () => {
  const [callActive, setCallActive] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = io(SOCKET_SERVER_URL);
    console.log("WebSocket connected", socketRef.current);

    // Handle offer, answer, and ICE candidates
    setupWebRTCSignaling();

    return () => {
      // Cleanup WebSocket connection and peer connection when component unmounts
      socketRef.current.disconnect();
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  const setupWebRTCSignaling = () => {
    socketRef.current.on("offer", async (offer) => {
      console.log("Received offer:", offer);
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socketRef.current.emit("answer", answer);
    });

    socketRef.current.on("answer", async (answer) => {
      console.log("Received answer:", answer);
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socketRef.current.on("ice-candidate", async (candidate) => {
      console.log("Received ICE candidate:", candidate);
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });
  };

  const startVideoCall = () => {
    setCallActive(true);

    // Request access to camera and microphone
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      })
      .then((stream) => {
        console.log("Media stream acquired");
        localVideoRef.current.srcObject = stream; // Set the local video stream

        // Initialize PeerConnection and add local stream tracks
        const pc = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        peerConnection.current = pc;

        // Handle remote stream
        pc.ontrack = (event) => {
          console.log("Remote stream received");
          remoteVideoRef.current.srcObject = event.streams[0];
        };

        // ICE candidate handling
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("Sending ICE candidate", event.candidate);
            socketRef.current.emit("ice-candidate", event.candidate);
          }
        };

        // Create and send offer if initiating call
        pc.createOffer().then((offer) => {
          console.log("Sending offer", offer);
          pc.setLocalDescription(offer);
          socketRef.current.emit("offer", offer);
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
        alert(
          "Error accessing your camera or microphone. Please check permissions."
        );
      });
  };

  return (
    <Layout>
      {/* This section should render your video consultation content under the main header */}
      <div className="w-full mx-auto sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header section for Video Consultation */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 sm:p-6">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-white leading-tight">
              Book Your Video Visit with the Best Doctors Online
            </h1>
          </div>

          {/* Video Consultation Content */}
          <div className="sm:p-4">
            <p className="text-lg text-gray-600 mb-8 text-center mx-auto">
              Stay safe at home while receiving top-quality medical care: online
              video visits and phone appointments with certified physicians.
              It's safe, secure, and with all the same privacy as a physical
              visit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                { icon: Video, text: "High-quality video calls" },
                { icon: Phone, text: "Phone consultations available" },
                { icon: Calendar, text: "Flexible scheduling" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg"
                >
                  <item.icon className="w-12 h-12 text-blue-500" />
                  <p className="text-center text-gray-700">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startVideoCall}
              className="w-full sm:w-auto px-6 py-2 bg-blue-400 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-500 transition duration-300"
            >
              Start Video Consultation
            </motion.button>

            {callActive && (
              <div className="mt-8">
                <div className="grid grid-cols-2 gap-4">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="w-full h-64 bg-black"
                  />
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    className="w-full h-64 bg-black"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default VideoConsultation;

// // ChatApp.js

// import React, { useEffect, useState, useMemo } from 'react';
// import { io } from "socket.io-client";
// import { Container, TextField, Typography, Button, Stack } from "@mui/material";

// function VideoConsultation({ doctorId, userId }) {
//   const socket = useMemo(() => io("http://localhost:3000"), []);

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [socketID, setSocketId] = useState("");

//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id);
//       console.log("Connected:", socket.id);

//       // Join the room with doctor and user IDs
//       socket.emit("join-chat", { doctorId, userId });
//     });

//     socket.on("receive-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [doctorId, userId, socket]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       const newMessage = { message, sender: socketID };
//       socket.emit("send-message", { doctorId, userId, message, sender: socketID });
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setMessage("");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h6" gutterBottom>
//         Chat ID: {socketID}
//       </Typography>

//       <Stack spacing={2}>
//         {messages.map((msg, index) => (
//           <Typography key={index} variant="body1">
//             {msg.sender === socketID ? "You" : "Doctor"}: {msg.message}
//           </Typography>
//         ))}
//       </Stack>

//       <form onSubmit={handleSendMessage} style={{ marginTop: "20px" }}>
//         <TextField
//           fullWidth
//           variant="outlined"
//           label="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <Button type="submit" variant="contained" color="primary" style={{ marginTop: "10px" }}>
//           Send
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default VideoConsultation;
