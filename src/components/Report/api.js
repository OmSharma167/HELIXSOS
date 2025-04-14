import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports';

export const uploadReport = async (reportData) => {
  return axios.post(`${API_URL}/upload`, reportData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

export const getUserReports = async () => {
  return axios.get(`${API_URL}/user-reports`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

export const getDoctorReports = async () => {
  return axios.get(`${API_URL}/doctor-reports`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

export const addDoctorNote = async (reportId, note) => {
  return axios.post(`${API_URL}/add-note/${reportId}`, { note }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};
