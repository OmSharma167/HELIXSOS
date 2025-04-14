import React, { useState } from 'react';
import { uploadReport } from './api';

const UploadReport = () => {
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [doctorId, setDoctorId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reportData = { title, fileUrl, doctorId };
      await uploadReport(reportData);
      alert('Report uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Error uploading report');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="File URL" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} required />
      <input type="text" placeholder="Doctor ID" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required />
      <button type="submit">Upload Report</button>
    </form>
  );
};

export default UploadReport;
