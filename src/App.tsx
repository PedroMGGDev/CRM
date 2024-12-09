import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import Messages from './pages/Messages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Removeu a verificação de autenticação */}
        <Route
          path="/"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/kanban"
          element={
            <Layout>
              <Kanban />
            </Layout>
          }
        />
        <Route
          path="/messages"
          element={
            <Layout>
              <Messages />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
