import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import ContinuityDashboard from './pages/ContinuityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The service continuity scheduling engine is currently analyzing global dependencies and detecting window conflicts. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<ContinuityDashboard />} />
          <Route path="/calendar" element={<Placeholder name="Global Event Calendar" />} />
          <Route path="/conflicts" element={<Placeholder name="Conflict Detection Hub" />} />
          <Route path="/impact" element={<Placeholder name="Service Impact Analysis" />} />
          <Route path="/governance" element={<Placeholder name="Change Governance Dashboard" />} />
          <Route path="/services" element={<Placeholder name="Service Dependency Explorer" />} />
          <Route path="/audit" element={<Placeholder name="Audit & Traceability Logs" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
