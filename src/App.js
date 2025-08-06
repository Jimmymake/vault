import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VaultOperations from './pages/VaultOperations';
import TransactionLedger from './pages/TransactionLedger';
import IdentityManagement from './pages/IdentityManagement';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vault-operations" element={<VaultOperations />} />
          <Route path="/ledger" element={<TransactionLedger />} />
          <Route path="/identity" element={<IdentityManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App; 