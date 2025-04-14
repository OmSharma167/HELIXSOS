import {
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Github,
  Linkedin,
  Code,
  Award,
  Users,
} from "lucide-react";

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto p-4   bg-white shadow-lg text-sm">
      <header className="mb-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-gray-800">Om Prakash Sharma</h1>
        <div className="flex flex-wrap justify-center gap-2 text-gray-600 text-xs mt-2">
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            <a
              href="tel:+918090349760"
              className="text-blue-600 hover:underline"
            >
              +918090349760
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="w-3 h-3 mr-1" />
            <a
              href="mailto:op809034@gmail.com"
              className="text-blue-600 hover:underline"
            >
              op809034@gmail.com
            </a>
          </div>
          <div className="flex items-center">
            <Linkedin className="w-3 h-3 mr-1" />
            <a
              href="https://linkedin.com/in/om-sharma"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/om-sharma
            </a>
          </div>
          <div className="flex items-center">
            <Github className="w-3 h-3 mr-1" />
            <a
              href="https://github.com/OmSharma167"
              className="text-blue-600 hover:underline"
            >
              github.com/OmSharma167
            </a>
          </div>
        </div>
      </header>

      <section className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
          <GraduationCap className="w-4 h-4 mr-1" />
          Education
        </h2>
        <div className="space-y-1">
          <div>
            <h3 className="font-semibold">
              Bachelor of Technology in Computer Science Engineering
            </h3>
            <p className="text-gray-600 text-xs">
              Noida Institute of Engineering And Technology, Gautam Buddha
              Nagar, Greater Noida
            </p>
            <p className="text-gray-500 text-xs">Nov. 2022 – April 2026</p>
          </div>
          <div className="flex gap-[10vw]">
            <div>
              <h3 className="font-semibold">Higher Secondary — 70.2%</h3>
              <p className="text-gray-600 text-xs">
                Obra Inter College, Sonbhadra, Uttar Pradesh
              </p>
              <p className="text-gray-500 text-xs">April 2020 – July 2021</p>
            </div>
            <div>
              <h3 className="font-semibold">Secondary — 80.22%</h3>
              <p className="text-gray-600 text-xs">
                Shiksha Niketan Obra Inter College, Sonbhadra, Uttar Pradesh
              </p>
              <p className="text-gray-500 text-xs">April 2018 – May 2019</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
          <Briefcase className="w-4 h-4 mr-1" />
          Experience
        </h2>
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold">Full Stack Developer Intern</h3>
            <p className="text-gray-1100 text-xs">
              Olcademy — Nov 2024 – Present — Delhi, India (Hybrid)
            </p>
            <ul className="list-disc list-inside text-xs text-gray-900 mt-1">
              <li>
                Collaborating with a 32-member team to develop core MERN stack
                features, targeting a 7% reduction in page load time through
                performance optimizations.
              </li>
              <li>
                Integrated location-based services via Google Maps API and IP
                geolocation to deliver personalized restaurant recommendations,
                aiming to improve order conversion rates.
              </li>
              <li>
                Enhanced the search and filter system by implementing dynamic
                querying, targeting a 73% reduction in search response time
                (from 3s to 0.8s) and increasing menu item discoverability by
                12%.
              </li>
              <li>
                Developed an intuitive merchant dashboard with real-time
                analytics and order management, designed to boost restaurant
                partner efficiency and streamline operations.
              </li>
              <li>
                Spearheaded the development of a promotional feature system,
                with plans to increase customer retention and average order
                value through tailored promotions and offers.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
          <Code className="w-4 h-4 mr-1" />
          Projects
        </h2>
        <div className="space-y-2">
          <div>
            <h3 className="font-semibold">
              HelixSOS Healthcare | MERN Stack, Tailwind CSS, Socket.io, Google
              Maps API, ISP, ML
            </h3>
            <p className="text-gray-500 text-xs">September 2024</p>
            <ul className="list-disc list-inside text-xs text-gray-900 mt-1">
              <li>
                Built a full-stack healthcare platform offering emergency SOS,
                online consultations, and real-time service.
              </li>
              <li>
                Arranged role-specific dashboards: User (services and profile
                management), Doctor (appointments and telemedicine), Police
                (emergency alerts), and Ambulance (dispatch coordination).
              </li>
              <li>
                Operated real-time communication with Socket.io for instant
                alerts and chat functionality.
              </li>
              <li>
                Integrated Google Maps API for locating nearby hospitals,
                ambulances, and Police tracking user locations during
                emergencies.
              </li>
              <li>
                Secured the platform with role-based authentication for users,
                doctors, and emergency responders.
              </li>
              <li>
                Managed data for user profiles, appointments, and service
                history with MongoDB for scalability.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              E-commerce Web Application | MERN Stack, Tailwind CSS
            </h3>
            <p className="text-gray-500 text-xs">June 2024</p>
            <ul className="list-disc list-inside text-xs text-gray-900 mt-1">
              <li>
                Executed a full-stack e-commerce website with product browsing,
                cart management, and order processing features.
              </li>
              <li>
                Used MongoDB for product data storage and Express.js and Node.js
                for backend API management.
              </li>
              <li>
                Applied role-based authentication for admins to manage products,
                users, and orders.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">
              Beauty and Wellness Web Application | MERN Stack, Tailwind CSS
            </h3>
            <p className="text-gray-500 text-xs">November 2023</p>
            <ul className="list-disc list-inside text-xs text-gray-900 mt-1">
              <li>
                Developed a full-stack web application for booking parlour,
                salon, spa, and wedding services using React and Tailwind CSS.
              </li>
              <li>
                Created dynamic booking forms with real-time service selection
                and scheduling functionality.
              </li>
              <li>
                Created modular, reusable components for user profiles, service
                management, and appointment scheduling.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
          <Code className="w-4 h-4 mr-1" />
          Technical Skills
        </h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <h3 className="font-semibold">Languages:</h3>
            <p className="text-gray-800">Java, Python, JavaScript, SQL</p>
          </div>
          <div>
            <h3 className="font-semibold">Web Technologies:</h3>
            <p className="text-gray-800">
              React, Node.js, Express.js, MongoDB, Tailwind CSS
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Tools:</h3>
            <p className="text-gray-800">
              Git, GitHub, GitLab, VS Code, Postman
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Operating Systems:</h3>
            <p className="text-gray-800">Windows</p>
          </div>
        </div>
      </section>

      <section className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
          <Award className="w-4 h-4 mr-1" />
          Certifications
        </h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <h3 className="font-semibold">React.js</h3>
            <p className="text-gray-500">Issued: November 2024</p>
          </div>
          <div>
            <h3 className="font-semibold">Data Analysis with Python</h3>
            <p className="text-gray-500">Issued: November 2023</p>
          </div>
          <div>
            <h3 className="font-semibold">Python Basics</h3>
            <p className="text-gray-500">Issued: February 2023</p>
          </div>
          <div>
            <h3 className="font-semibold">Data Visualization</h3>
            <p className="text-gray-500">Issued: July 2023</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
          <Users className="w-4 h-4 mr-1" />
          Extracurricular Activities
        </h2>
        <p className="text-xs text-gray-700">
          Hackathon Participant — GeeksforGeeks Healthcare Hackathon 2024,
          contributing to a healthcare application.
        </p>
      </section>
    </div>
  );
};

export default Resume;
