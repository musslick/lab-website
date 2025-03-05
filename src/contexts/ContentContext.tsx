import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { TeamMember, teamMembers as initialTeamMembers } from '../data/team';

interface ContentContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  updateProject: (updatedProject: Project) => void;
  addProject: (newProject: Project) => void;
  deleteProject: (id: string) => void;
  updateTeamMember: (updatedMember: TeamMember) => void;
  addTeamMember: (newMember: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType>({
  projects: [],
  teamMembers: [],
  updateProject: () => {},
  addProject: () => {},
  deleteProject: () => {},
  updateTeamMember: () => {},
  addTeamMember: () => {},
  deleteTeamMember: () => {},
  resetToDefaults: () => {},
});

export const useContent = () => useContext(ContentContext);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Load saved data or use initial data
    const loadData = () => {
      try {
        const savedProjects = localStorage.getItem('projects');
        const savedTeamMembers = localStorage.getItem('teamMembers');
  
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          setProjects(initialProjects);
        }
  
        if (savedTeamMembers) {
          setTeamMembers(JSON.parse(savedTeamMembers));
        } else {
          setTeamMembers(initialTeamMembers);
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setProjects(initialProjects);
        setTeamMembers(initialTeamMembers);
      }
    };

    loadData();
  }, []);

  // Save changes to localStorage
  const saveProjects = (updatedProjects: Project[]) => {
    try {
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error saving projects to localStorage:", error);
      alert("Failed to save projects. LocalStorage might be full or unavailable.");
    }
  };

  const saveTeamMembers = (updatedMembers: TeamMember[]) => {
    try {
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      setTeamMembers(updatedMembers);
    } catch (error) {
      console.error("Error saving team members to localStorage:", error);
      alert("Failed to save team members. LocalStorage might be full or unavailable.");
    }
  };

  // Project management functions
  const updateProject = (updatedProject: Project) => {
    console.log("Updating project:", updatedProject);
    const newProjects = projects.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    saveProjects(newProjects);
  };

  const addProject = (newProject: Project) => {
    // Ensure unique ID
    const projectWithId = {
      ...newProject,
      id: newProject.id || `project-${Date.now()}`
    };
    saveProjects([...projects, projectWithId]);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(project => project.id !== id);
    saveProjects(newProjects);
    
    // Also update team members that reference this project
    const updatedTeamMembers = teamMembers.map(member => {
      if (member.projects && member.projects.includes(id)) {
        return {
          ...member,
          projects: member.projects.filter(projectId => projectId !== id)
        };
      }
      return member;
    });
    
    saveTeamMembers(updatedTeamMembers);
  };

  // Team member management functions
  const updateTeamMember = (updatedMember: TeamMember) => {
    const newTeamMembers = teamMembers.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    saveTeamMembers(newTeamMembers);
  };

  const addTeamMember = (newMember: TeamMember) => {
    // Ensure unique ID
    const memberWithId = {
      ...newMember,
      id: newMember.id || `member-${Date.now()}`
    };
    saveTeamMembers([...teamMembers, memberWithId]);
  };

  const deleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(member => member.id === id);
    const newTeamMembers = teamMembers.filter(member => member.id !== id);
    saveTeamMembers(newTeamMembers);
    
    // If we have a member name, update all projects that reference this member
    if (memberToDelete) {
      const updatedProjects = projects.map(project => {
        if (project.team.includes(memberToDelete.name)) {
          return {
            ...project,
            team: project.team.filter(name => name !== memberToDelete.name)
          };
        }
        return project;
      });
      
      saveProjects(updatedProjects);
    }
  };
  
  // Function to reset all data to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      localStorage.removeItem('projects');
      localStorage.removeItem('teamMembers');
      setProjects(initialProjects);
      setTeamMembers(initialTeamMembers);
      alert('Data has been reset to defaults.');
    }
  };

  return (
    <ContentContext.Provider value={{
      projects,
      teamMembers,
      updateProject,
      addProject,
      deleteProject,
      updateTeamMember,
      addTeamMember,
      deleteTeamMember,
      resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};
