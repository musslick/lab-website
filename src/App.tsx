import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Feed from './pages/Feed';
import ProjectDetails from './pages/ProjectDetails';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;