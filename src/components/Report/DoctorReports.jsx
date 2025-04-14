import React, { useState, useEffect } from 'react';
import { getDoctorReports } from './api';

const DoctorReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getDoctorReports();
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Doctor Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report._id}>{report.title} - {report.fileUrl}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorReports;
