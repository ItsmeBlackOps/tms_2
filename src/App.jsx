import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DataEntryForm from './components/DataEntry/DataEntryForm';
import RecordsTable from './components/Records/RecordsTable';
import TaskList from './components/Tasks/TaskList';
import ReportGenerator from './components/Reporting/ReportGenerator';
import { AuthProvider, useAuth } from './components/context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* Wrap routes in AuthProvider */}
        <Routes>
          <Route exact path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/data-entry" element={<PrivateRoute><DataEntryForm /></PrivateRoute>} />
          <Route path="/records" element={<PrivateRoute><RecordsTable /></PrivateRoute>} />
          <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
          <Route path="/report-generator" element={<PrivateRoute><ReportGenerator /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

// PublicRoute component for routes accessible to everyone
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get current user from context
  return currentUser ? <Navigate to="/dashboard" /> : children;
};

// PrivateRoute component for routes accessible only to logged-in users
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get current user from context
  return currentUser ? children : <Navigate to="/" />;
};

export default App;
