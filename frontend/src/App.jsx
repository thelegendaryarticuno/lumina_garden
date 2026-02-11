import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import GuestUpload from './pages/GuestUpload';
import Processing from './pages/Processing';
import Dashboard from './pages/Dashboard';
import NotesView from './pages/NotesView';
import QuizView from './pages/QuizView';
import GardenView from './pages/GardenView';
import { SessionProvider, useSession } from './context/SessionContext';

function ProtectedRoute({ children }) {
  const { sessionActive } = useSession();
  const location = useLocation();

  if (!sessionActive) {
    // Redirect to landing page if no active session
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <GuestUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/processing"
          element={
            <ProtectedRoute>
              <Processing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/garden"
          element={
            <ProtectedRoute>
              <GardenView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <SessionProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </SessionProvider>
  );
}

export default App;
