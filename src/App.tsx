import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
// Removendo a importação de "Contacts" já que não é necessária no momento
// import Contacts from './pages/Contacts';
import Companies from './pages/Companies';
import Kanban from './pages/Kanban';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const currentUser = useStore((state) => state.currentUser);
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* Removendo a rota de "contacts", já que o arquivo não existe e não é necessário */}
          {/* <Route path="contacts" element={<Contacts />} /> */}
          <Route path="companies" element={<Companies />} />
          <Route path="kanban" element={<Kanban />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
