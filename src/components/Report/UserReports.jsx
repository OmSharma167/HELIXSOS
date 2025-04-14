import React, { useState, useEffect } from 'react';
import { getUserReports } from './api';

const UserReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getUserReports();
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>User Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report._id}>{report.title} - {report.fileUrl}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserReports;
