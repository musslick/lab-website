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
import Software from './pages/Software';
import SoftwareList from './pages/admin/SoftwareList';
import SoftwareForm from './pages/admin/SoftwareForm';
import { AuthProvider } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import ScrollToTop from './components/ScrollToTop';
import RequireAuth from './components/RequireAuth';
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
              <Route path="/software" element={<Software />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/projects" element={<RequireAuth><ProjectsList /></RequireAuth>} />
              <Route path="/admin/projects/new" element={<RequireAuth><ProjectForm /></RequireAuth>} />
              <Route path="/admin/projects/edit/:id" element={<RequireAuth><ProjectForm /></RequireAuth>} />
              <Route path="/admin/team" element={<RequireAuth><TeamMembersList /></RequireAuth>} />
              <Route path="/admin/team/new" element={<RequireAuth><TeamMemberForm /></RequireAuth>} />
              <Route path="/admin/team/edit/:id" element={<RequireAuth><TeamMemberForm /></RequireAuth>} />
              <Route path="/admin/news" element={<RequireAuth><NewsList /></RequireAuth>} />
              <Route path="/admin/news/new" element={<RequireAuth><NewsForm /></RequireAuth>} />
              <Route path="/admin/news/edit/:id" element={<RequireAuth><NewsForm /></RequireAuth>} />
              <Route path="/admin/collaborators" element={<RequireAuth><CollaboratorsList /></RequireAuth>} />
              <Route path="/admin/collaborators/new" element={<RequireAuth><CollaboratorForm /></RequireAuth>} />
              <Route path="/admin/collaborators/edit/:id" element={<RequireAuth><CollaboratorForm /></RequireAuth>} />
              <Route path="/admin/publications" element={<RequireAuth><PublicationsList /></RequireAuth>} />
              <Route path="/admin/publications/new" element={<RequireAuth><PublicationForm /></RequireAuth>} />
              <Route path="/admin/publications/edit/:id" element={<RequireAuth><PublicationForm /></RequireAuth>} />
              <Route path="/admin/software" element={<RequireAuth><SoftwareList /></RequireAuth>} />
              <Route path="/admin/software/new" element={<RequireAuth><SoftwareForm /></RequireAuth>} />
              <Route path="/admin/software/edit/:id" element={<RequireAuth><SoftwareForm /></RequireAuth>} />
            </Routes>
          </div>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
};

export default App;