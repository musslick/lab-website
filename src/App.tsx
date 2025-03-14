import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Team from './pages/Team';
import TeamMemberDetail from './pages/TeamMemberDetail';
import Feed from './pages/Feed';
import Publications from './pages/Publications';
import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectForm from './pages/admin/ProjectForm';
import TeamMemberForm from './pages/admin/TeamMemberForm';
import NewsForm from './pages/admin/NewsForm';
import CollaboratorsList from './pages/admin/CollaboratorsList';
import CollaboratorForm from './pages/admin/CollaboratorForm';
import PublicationForm from './pages/admin/PublicationForm';
import PublicationsList from './pages/admin/PublicationsList';
import TeamMembersList from './pages/admin/TeamMembersList';
import NewsList from './pages/admin/NewsList';
import ProjectsList from './pages/admin/ProjectsList';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import ScrollToTop from './components/ScrollToTop';
import './styles/styles.css';
import './styles/admin.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <ScrollToTop />
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
              <Route path="/team/:id" element={
                <Layout>
                  <TeamMemberDetail />
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
              <Route path="/publications" element={
                <Layout>
                  <Publications />
                </Layout>
              } />
              {/* Remove the nested Layout component for ProjectDetails */}
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/projects" element={<ProjectsList />} />
              <Route path="/admin/projects/new" element={<ProjectForm />} />
              <Route path="/admin/projects/edit/:id" element={<ProjectForm />} />
              <Route path="/admin/team" element={<TeamMembersList />} />
              <Route path="/admin/team/new" element={<TeamMemberForm />} />
              <Route path="/admin/team/edit/:id" element={<TeamMemberForm />} />
              <Route path="/admin/news" element={<NewsList />} />
              <Route path="/admin/news/new" element={<NewsForm />} />
              <Route path="/admin/news/edit/:id" element={<NewsForm />} />
              <Route path="/admin/collaborators" element={<CollaboratorsList />} />
              <Route path="/admin/collaborators/new" element={<CollaboratorForm />} />
              <Route path="/admin/collaborators/edit/:id" element={<CollaboratorForm />} />
              <Route path="/admin/publications" element={<PublicationsList />} />
              <Route path="/admin/publications/new" element={<PublicationForm />} />
              <Route path="/admin/publications/edit/:id" element={<PublicationForm />} />
            </Routes>
          </div>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;