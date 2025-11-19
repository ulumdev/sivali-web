import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardCompany from "./pages/DashboardComp";
import DashboardInternal from "./pages/INTERNAL/dashboard/DashboardInt";
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
import ListAttendance from "./pages/attendance/ListAttendance";
import AttendanceDetail from "./pages/attendance/AttendanceDetail";
import TransactionDetail from "./pages/transaction/TransactionDetail";

import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorized from "./pages/error/NotAuthorized";
import NotFound from "./pages/error/NotFound";
import JobActiveInternal from "./pages/INTERNAL/job-posting/JobActiveInternal";
import JobExpiredInternal from "./pages/INTERNAL/job-posting/JobExpiredInternal";
import CompanyRegisteredInt from "./pages/INTERNAL/company/CompanyRegisteredInt";
import CompanyVerifiedInt from "./pages/INTERNAL/company/CompanyVerifiedInt";
import CompanyBlockedInt from "./pages/INTERNAL/company/CompanyBlockedInt";
import JobDetailInternal from "./pages/INTERNAL/job-posting/JobDetailInternal";
import EmployeeRegistered from "./pages/INTERNAL/employee/EmployeeRegistered";
import EmployeeVerified from "./pages/INTERNAL/employee/EmployeeVerified";
import EmployeeSuspended from "./pages/INTERNAL/employee/EmployeeSuspended";
import EmployeeBlocked from "./pages/INTERNAL/employee/EmployeeBlocked";
import CompanyDetailVerified from "./pages/INTERNAL/company/CompanyDetailVerified";
import CompanyDetailBlocked from "./pages/INTERNAL/company/CompanyDetailBlocked";
import CompanyDetailRegistered from "./pages/INTERNAL/company/CompanyDetailRegistered";
import RoleList from "./pages/INTERNAL/list-role/RoleList";
import HistoryList from "./pages/INTERNAL/transaction/HistoryList";
import PayrollList from "./pages/INTERNAL/transaction/PayrollList";
import TopupList from "./pages/INTERNAL/transaction/TopupList";
import TopupDetail from "./pages/INTERNAL/transaction/TopupDetail";
import PayrollDetail from "./pages/INTERNAL/transaction/PayrollDetail";
import BannerList from "./pages/INTERNAL/banner/BannerList";
import BannerCreate from "./pages/INTERNAL/banner/BannerCreate";
import BannerEdit from "./pages/INTERNAL/banner/BannerEdit";
import HistoryDetail from "./pages/INTERNAL/transaction/HistoryDetail";
import EmployeeDetailVerified from "./pages/INTERNAL/employee/EmployeeDetailVerified";
import EmployeeDetailRegistered from "./pages/INTERNAL/employee/EmployeeDetailRegistered";
import EmployeeDetailSuspended from "./pages/INTERNAL/employee/EmployeeDetailSuspended";
import EmployeeDetailBlocked from "./pages/INTERNAL/employee/EmployeeDetailBlocked";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const Dashboard = role === "internal" ? DashboardInternal : DashboardCompany;

  return (
    <BrowserRouter>
      <Routes>
        {/* PROTECTED ROUTES - LOGIN */}
        <Route
          path="/"
          element={token ? <Layout /> : <Navigate to="/login" replace />}
        >
          {/* AKSES SEMUA ROLE */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />

          {/* =================== */}
          {/*AKSES HANYA UNTUK COMPANY */}
          {/* =================== */}
          <Route
            path="/job-posting/active"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobPostingActive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-posting/active/:id"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <ActiveDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-postings/create"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <CreateJobPosting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-posting/draft"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobPostingDraft />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-posting/expired"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <JobPostingExpired />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-posting/expired/:id"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <ExpiredDetail />
              </ProtectedRoute>
            }
          />
          {/* Default redirect kalau akses /job-posting langsung */}
          <Route
            path="/job-posting"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <Navigate to="/job-posting/active" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <ListAttendance />
              </ProtectedRoute>
            }
          />
          {/* Attendance Sub Routes */}
          <Route
            path="/attendance/:id"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <AttendanceDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transaction"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <ListTransaction />
              </ProtectedRoute>
            }
          />
          {/* Transaction Sub Routes */}
          <Route
            path="/transaction/:id"
            element={
              <ProtectedRoute allowedRoles={["company"]}>
                <TransactionDetail />
              </ProtectedRoute>
            }
          />

          {/* =================== */}
          {/*AKSES HANYA UNTUK INTERNAL */}
          {/* =================== */}
          {/* Job Posting */}
          <Route
            path="/internal/job-posting/active"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <JobActiveInternal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/job-posting/active/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <JobDetailInternal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/job-posting/expired"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <JobExpiredInternal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/job-posting/expired/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <JobDetailInternal />
              </ProtectedRoute>
            }
          />

          {/* Companies */}
          <Route
            path="/internal/companies"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <Navigate to="/internal/companies/registered" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/companies/registered"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanyRegisteredInt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/companies/registered/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanyDetailRegistered />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/companies/verified"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanyVerifiedInt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/companies/verified/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanyDetailVerified />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/internal/companies/suspended"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanySuspendedInt />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/internal/companies/blocked"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanyBlockedInt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/companies/blocked/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <CompanyDetailBlocked />
              </ProtectedRoute>
            }
          />

          {/* Employees */}
          <Route
            path="/internal/employees"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <Navigate to="/internal/employees/registered" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/registered"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeRegistered />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/registered/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeDetailRegistered />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/verified"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeVerified />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/verified/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeDetailVerified />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/suspended"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeSuspended />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/suspended/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeDetailSuspended />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/blocked"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeBlocked />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/employees/blocked/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <EmployeeDetailBlocked />
              </ProtectedRoute>
            }
          />

          {/* Transaction */}
          <Route
            path="/internal/transaction"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <Navigate to="/internal/transactions/history" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/transaction/history"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <HistoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/transaction/history/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <HistoryDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/transaction/payroll"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <PayrollList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/transaction/payroll/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <PayrollDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/transaction/top-up"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <TopupList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/transaction/top-up/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <TopupDetail />
              </ProtectedRoute>
            }
          />


          {/* List Job Roles */}
          <Route
            path="/internal/job-roles"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <RoleList />
              </ProtectedRoute>
            }
          />

          {/* Routes Banner */}
          <Route
            path="/internal/banners"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <BannerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/banners/create"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <BannerCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal/banners/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["internal"]}>
                <BannerEdit />
              </ProtectedRoute>
            }
          />

        </Route>
        {/* Login page di luar layout */}

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* ERROR ROUTES */}
        {/* Error Pages */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
