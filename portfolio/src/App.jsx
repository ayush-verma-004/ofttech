import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Team from './components/Team';
import Services from './components/Services';
import Industries from './components/Industries';
import Technologies from './components/Technologies';
import Solutions from './components/Portfolio';
import Engagement from './components/Engagement';
import WhyOFT from './components/WhyAASP';
import Testimonials from './components/Testimonials';
import Careers from './components/Careers';
import Contact from './components/Contact';

// Lazy Load Pages
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const UsersList = lazy(() => import('./pages/admin/UsersList'));
const UserForm = lazy(() => import('./pages/admin/UserForm'));
const AboutEditor = lazy(() => import('./pages/admin/AboutEditor'));
const CareersEditor = lazy(() => import('./pages/admin/CareersEditor'));
const ProjectsEditor = lazy(() => import('./pages/admin/ProjectsEditor'));
const ServicesEditor = lazy(() => import('./pages/admin/ServicesEditor'));
const TeamEditor = lazy(() => import('./pages/admin/TeamEditor'));
const SettingsEditor = lazy(() => import('./pages/admin/SettingsEditor'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Team />
      <Services />
      <Industries />
      <Technologies />
      <Solutions />
      <Engagement />
      <WhyOFT />
      <Testimonials />
      <Careers />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-primary">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />
              <Route path="users" element={<UsersList />} />
              <Route path="users/new" element={<UserForm />} />
              <Route path="users/:id" element={<UserForm />} />

              {/* Content Editors */}
              <Route path="about" element={<AboutEditor />} />
              <Route path="careers" element={<CareersEditor />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="team" element={<TeamEditor />} />
              <Route path="settings" element={<SettingsEditor />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
