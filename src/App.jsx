import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './database/Firebase'; // Ensure this path is correct for your project structure
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import DataEntryForm from './components/DataEntry/DataEntryForm';
import RecordsTable from './components/Records/RecordsTable';
import TaskList from './components/Tasks/TaskList';
import ReportGenerator from './components/Reporting/ReportGenerator';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // User is signed out
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          !currentUser ? <Login /> : <Navigate to="/dashboard" />
        } />
        <Route path="/dashboard" element={
          currentUser ? <Dashboard /> : <Navigate to="/" />
        } />
        <Route path="/data-entry" element={
          currentUser ? <DataEntryForm /> : <Navigate to="/" />
        } />
        <Route path="/records" element={
          currentUser ? <RecordsTable /> : <Navigate to="/" />
        } />
        <Route path="/tasks" element={
          currentUser ? <TaskList /> : <Navigate to="/" />
        } />
        <Route path="/report-generator" element={
          currentUser ? <ReportGenerator /> : <Navigate to="/" />
        } />

      </Routes>
    </Router>
  );
};

export default App;
