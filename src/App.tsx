import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Feed from './pages/Feed';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectForm from './pages/admin/ProjectForm';
import TeamMemberForm from './pages/admin/TeamMemberForm';
import NewsForm from './pages/admin/NewsForm';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import './styles/styles.css';
import './styles/admin.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/team" element={
                <Layout>
                  <Team />
                </Layout>
              } />
              <Route path="/feed" element={
                <Layout>
                  <Feed />
                </Layout>
              } />
              <Route path="/projects" element={
                <Layout>
                  <Projects />
                </Layout>
              } />
              <Route path="/projects/:id" element={
                <Layout>
                  <ProjectDetails />
                </Layout>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/projects/new" element={<ProjectForm />} />
              <Route path="/admin/projects/edit/:id" element={<ProjectForm />} />
              <Route path="/admin/team/new" element={<TeamMemberForm />} />
              <Route path="/admin/team/edit/:id" element={<TeamMemberForm />} />
              <Route path="/admin/news/new" element={<NewsForm />} />
              <Route path="/admin/news/edit/:id" element={<NewsForm />} />
            </Routes>
          </div>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;