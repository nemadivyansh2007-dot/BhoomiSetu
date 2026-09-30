import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import TopBar from '@/components/layout/TopBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import ResearchPage from '@/pages/ResearchPage';
import DataEvidencePage from '@/pages/DataEvidencePage';
import LandInsightsPage from '@/pages/LandInsightsPage';
import PolicyPage from '@/pages/PolicyPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import KnowledgePage from '@/pages/KnowledgePage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/data" element={<DataEvidencePage />} />
            <Route path="/land-insights" element={<LandInsightsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
