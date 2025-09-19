import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // nanti kita buat
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import JobPostingActive from "./pages/job-posting/JobActive";
import JobPostingDraft from "./pages/job-posting/JobDraft";
import JobPostingExpired from "./pages/job-posting/JobExpired";
import ExpiredDetail from "./pages/job-posting/ExpiredDetail";
import CreateJobPosting from "./pages/job-posting/CreateJobPosting";
import ActiveDetail from "./pages/job-posting/ActiveDetail";
import ListTransaction from "./pages/transaction/ListTransaction";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* Job Posting Sub Routes */}
          <Route path="/job-posting/active" element={<JobPostingActive />} />
          <Route path="/job-posting/active/:id" element={<ActiveDetail />} />
          <Route path="/job-postings/create" element={<CreateJobPosting />} />
          <Route path="/job-posting/draft" element={<JobPostingDraft />} />
          <Route path="/job-posting/expired" element={<JobPostingExpired />} />
          <Route path="/job-posting/expired/:id" element={<ExpiredDetail />} />

          {/* Default redirect kalau akses /job-posting langsung */}
          <Route
            path="/job-posting"
            element={<Navigate to="/job-posting/active" replace />}
          />
          <Route path="attendance" element={<div>Attendance</div>} />
          <Route path="transaction" element={<ListTransaction />} />
        </Route>
        {/* Login page di luar layout */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
