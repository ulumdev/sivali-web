import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // nanti kita buat
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import JobPostingActive from './pages/job-posting/JobActive';

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Layout /> : <Navigate to="/login" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* Job Posting Sub Routes */}
            <Route path="/job-posting/active" element={<JobPostingActive/>} />
            <Route path="/job-posting/draft" element={<div>Job Posting Draft</div>} />
            <Route path="/job-posting/expired" element={<div>Job Posting Expired</div>} />

            {/* Default redirect kalau akses /job-posting langsung */}
            <Route path="/job-posting" element={<Navigate to="/job-posting/active" replace />} />
          <Route path="attendance" element={<div>Attendance</div>} />
          <Route path="transaction" element={<div>Transaction</div>} />
        </Route>
        {/* Login page di luar layout */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
