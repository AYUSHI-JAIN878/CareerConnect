import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import JobForm from "./pages/JobForm";

import { AdminUsers, AdminJobs } from "./pages/Admin";
import NotFound from "./pages/NotFound";

import { useAuth } from "./context/AuthContext";

function RedirectDashboard() {
  const { user } = useAuth();

  return (
    <Navigate
      to={user ? "/dashboard" : "/login"}
      replace
    />
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />} />


        {/* =========================
            COMMON PROTECTED ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute
              roles={["student", "recruiter", "admin"]}
            />
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>


        {/* =========================
            STUDENT ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute roles={["student"]} />
          }
        >
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/applications"
            element={<Applications />}
          />
        </Route>


        {/* =========================
            RECRUITER ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute roles={["recruiter"]} />
          }
        >
          <Route
            path="/recruiter/profile"
            element={<Profile />}
          />

          <Route
            path="/jobs/create"
            element={<JobForm />}
          />

          <Route
            path="/jobs/edit/:id"
            element={<JobForm />}
          />

          <Route
            path="/applications/manage"
            element={<Applications manage />}
          />
        </Route>


        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route
          element={
            <ProtectedRoute roles={["admin"]} />
          }
        >
          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          <Route
            path="/admin/jobs"
            element={<AdminJobs />}
          />
        </Route>


        {/* =========================
            404
        ========================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </Layout>
  );
}