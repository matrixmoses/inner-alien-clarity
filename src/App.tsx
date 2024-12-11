import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TimeBox from "./pages/TimeBox";
import History from "./pages/History";
import Procrastination from "./pages/Procrastination";
import { Toaster } from "./components/ui/toaster";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/timebox" element={<ProtectedRoute><TimeBox /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/procrastination" element={<ProtectedRoute><Procrastination /></ProtectedRoute>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;