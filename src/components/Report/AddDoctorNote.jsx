import React, { useState } from 'react';
import { addDoctorNote } from './api';

const AddDoctorNote = () => {
  const [reportId, setReportId] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoctorNote(reportId, note);
      alert('Note added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding note');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Report ID" value={reportId} onChange={(e) => setReportId(e.target.value)} required />
      <textarea placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} required></textarea>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddDoctorNote;
