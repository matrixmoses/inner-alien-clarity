import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Index />} />
        <Route path="/timebox" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;