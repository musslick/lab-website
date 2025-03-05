import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { TeamMember, teamMembers as initialTeamMembers } from '../data/team';
import { NewsItem, newsItems as initialNewsItems } from '../data/news';
import { createGradient } from '../utils/colorUtils';

interface ContentContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  newsItems: NewsItem[];
  updateProject: (updatedProject: Project) => void;
  addProject: (newProject: Project) => void;
  deleteProject: (id: string) => void;
  updateTeamMember: (updatedMember: TeamMember) => void;
  addTeamMember: (newMember: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateNewsItem: (updatedNewsItem: NewsItem) => void;
  addNewsItem: (newNewsItem: NewsItem) => void;
  deleteNewsItem: (id: string) => void;
  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType>({
  projects: [],
  teamMembers: [],
  newsItems: [],
  updateProject: () => {},
  addProject: () => {},
  deleteProject: () => {},
  updateTeamMember: () => {},
  addTeamMember: () => {},
  deleteTeamMember: () => {},
  updateNewsItem: () => {},
  addNewsItem: () => {},
  deleteNewsItem: () => {},
  resetToDefaults: () => {},
});

export const useContent = () => useContext(ContentContext);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  // Helper function to generate color gradients for projects based on team members
  const updateProjectGradients = (currentProjects: Project[], currentTeamMembers: TeamMember[]): Project[] => {
    return currentProjects.map(project => {
      // Get the colors of team members assigned to this project
      const teamColors = project.team.map(memberName => {
        const member = currentTeamMembers.find(m => m.name === memberName);
        return member ? member.color : '#CCCCCC'; // Default gray if member not found
      });
      
      // If no team members, use a default color
      if (teamColors.length === 0) {
        return {
          ...project,
          color: 'linear-gradient(120deg, #FF5733, #00AAFF)'
        };
      }
      
      // Generate a new gradient based on team members' colors
      const gradient = createGradient(teamColors, {
        includeHighlight: true,
        highlightColor: '#00AAFF', // Lab blue
        mixColors: true,
        mixRatio: 0.3,
        angle: 135
      });
      
      return {
        ...project,
        color: gradient
      };
    });
  };

  useEffect(() => {
    // Load saved data or use initial data
    const loadData = () => {
      try {
        const savedProjects = localStorage.getItem('projects');
        const savedTeamMembers = localStorage.getItem('teamMembers');
        const savedNewsItems = localStorage.getItem('newsItems');
  
        let projectsData: Project[];
        let teamData: TeamMember[];
        let newsData: NewsItem[];
  
        if (savedTeamMembers) {
          teamData = JSON.parse(savedTeamMembers);
        } else {
          teamData = initialTeamMembers;
        }
        setTeamMembers(teamData);
  
        if (savedProjects) {
          projectsData = JSON.parse(savedProjects);
        } else {
          projectsData = initialProjects;
        }
        
        // Update project colors based on team members
        const updatedProjects = updateProjectGradients(projectsData, teamData);
        setProjects(updatedProjects);
        
        if (savedNewsItems) {
          newsData = JSON.parse(savedNewsItems);
        } else {
          newsData = initialNewsItems;
        }
        setNewsItems(newsData);
        
        // Save the updated projects if necessary
        if (savedProjects && JSON.stringify(updatedProjects) !== savedProjects) {
          localStorage.setItem('projects', JSON.stringify(updatedProjects));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setProjects(initialProjects);
        setTeamMembers(initialTeamMembers);
        setNewsItems(initialNewsItems);
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
      
      // When team members change, update all project colors
      const updatedProjects = updateProjectGradients(projects, updatedMembers);
      saveProjects(updatedProjects);
      
    } catch (error) {
      console.error("Error saving team members to localStorage:", error);
      alert("Failed to save team members. LocalStorage might be full or unavailable.");
    }
  };

  const saveNewsItems = (updatedNews: NewsItem[]) => {
    try {
      localStorage.setItem('newsItems', JSON.stringify(updatedNews));
      console.log("Saved news items to localStorage, count:", updatedNews.length);
      setNewsItems(updatedNews);
    } catch (error) {
      console.error("Error saving news items to localStorage:", error);
      alert("Failed to save news. LocalStorage might be full or unavailable.");
    }
  };

  // Project management functions
  const updateProject = (updatedProject: Project) => {
    console.log("Updating project:", updatedProject);
    
    // Ensure the color is updated based on team members
    const teamColors = updatedProject.team.map(memberName => {
      const member = teamMembers.find(m => m.name === memberName);
      return member ? member.color : '#CCCCCC'; // Default gray if member not found
    });
    
    // Generate a new gradient if team members have changed
    const projectWithUpdatedColor = {
      ...updatedProject,
      color: createGradient(teamColors, {
        includeHighlight: true,
        highlightColor: '#00AAFF', // Lab blue
        mixColors: true,
        mixRatio: 0.3,
        angle: 135
      })
    };
    
    const newProjects = projects.map(project => 
      project.id === updatedProject.id ? projectWithUpdatedColor : project
    );
    
    saveProjects(newProjects);
  };

  const addProject = (newProject: Project) => {
    // Ensure unique ID
    const projectWithId = {
      ...newProject,
      id: newProject.id || `project-${Date.now()}`
    };
    
    // Ensure the color is generated based on team members
    const teamColors = projectWithId.team.map(memberName => {
      const member = teamMembers.find(m => m.name === memberName);
      return member ? member.color : '#CCCCCC'; // Default gray if member not found
    });
    
    // Generate a new gradient if team members are present
    const projectWithColor = {
      ...projectWithId,
      color: teamColors.length > 0 
        ? createGradient(teamColors, {
            includeHighlight: true,
            highlightColor: '#00AAFF', // Lab blue
            mixColors: true,
            mixRatio: 0.3,
            angle: 135
          })
        : projectWithId.color // Keep the existing color if no team members
    };
    
    saveProjects([...projects, projectWithColor]);
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
    const previousMember = teamMembers.find(m => m.id === updatedMember.id);
    const newTeamMembers = teamMembers.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    
    // First update team members
    setTeamMembers(newTeamMembers);
    
    // If color changed, update all projects that include this team member
    if (previousMember && previousMember.color !== updatedMember.color) {
      const updatedProjects = projects.map(project => {
        if (project.team.includes(updatedMember.name)) {
          // Get the updated team colors
          const teamColors = project.team.map(memberName => {
            if (memberName === updatedMember.name) return updatedMember.color;
            const member = newTeamMembers.find(m => m.name === memberName);
            return member ? member.color : '#CCCCCC';
          });
          
          return {
            ...project,
            color: createGradient(teamColors, {
              includeHighlight: true,
              highlightColor: '#00AAFF',
              mixColors: true,
              mixRatio: 0.3,
              angle: 135
            })
          };
        }
        return project;
      });
      
      // Save the updated projects with new gradients
      saveProjects(updatedProjects);
    } else {
      // Otherwise just save team members
      localStorage.setItem('teamMembers', JSON.stringify(newTeamMembers));
    }
  };

  const addTeamMember = (newMember: TeamMember) => {
    // Ensure unique ID
    const memberWithId = {
      ...newMember,
      id: newMember.id || `member-${Date.now()}`
    };
    const updatedMembers = [...teamMembers, memberWithId];
    saveTeamMembers(updatedMembers);
  };

  const deleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(member => member.id === id);
    const newTeamMembers = teamMembers.filter(member => member.id !== id);
    
    // If we have a member name, update all projects that reference this member
    if (memberToDelete) {
      const updatedProjects = projects.map(project => {
        if (project.team.includes(memberToDelete.name)) {
          // Remove this member from the team
          const updatedTeam = project.team.filter(name => name !== memberToDelete.name);
          
          // Get the updated team colors
          const teamColors = updatedTeam.map(memberName => {
            const member = newTeamMembers.find(m => m.name === memberName);
            return member ? member.color : '#CCCCCC';
          });
          
          // Create a new gradient based on remaining team members
          const updatedColor = teamColors.length > 0 
            ? createGradient(teamColors, {
                includeHighlight: true,
                highlightColor: '#00AAFF',
                mixColors: true,
                mixRatio: 0.3,
                angle: 135
              })
            : 'linear-gradient(120deg, #FF5733, #00AAFF)'; // Default gradient if no members left
          
          return {
            ...project,
            team: updatedTeam,
            color: updatedColor
          };
        }
        return project;
      });
      
      // Save both updated projects and team members
      setProjects(updatedProjects);
      setTeamMembers(newTeamMembers);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      localStorage.setItem('teamMembers', JSON.stringify(newTeamMembers));
    } else {
      // If no member found, just save the team members
      saveTeamMembers(newTeamMembers);
    }
  };
  
  // News management functions
  const updateNewsItem = (updatedNewsItem: NewsItem) => {
    try {
      console.log("Updating news item:", updatedNewsItem);
      
      // First check if the item exists
      const existingItemIndex = newsItems.findIndex(item => item.id === updatedNewsItem.id);
      
      if (existingItemIndex === -1) {
        throw new Error(`News item with ID ${updatedNewsItem.id} not found`);
      }
      
      // Create a new array with the updated item
      const newNewsItems = [...newsItems];
      newNewsItems[existingItemIndex] = {...updatedNewsItem};
      
      // Save to localStorage
      localStorage.setItem('newsItems', JSON.stringify(newNewsItems));
      
      // Update state
      setNewsItems(newNewsItems);
      console.log("News item updated successfully:", updatedNewsItem.id);
      
      return true;
    } catch (error) {
      console.error("Failed to update news item:", error);
      throw error;
    }
  };

  const addNewsItem = (newNewsItem: NewsItem) => {
    try {
      console.log("Adding news item:", newNewsItem);
      
      // Ensure the item has an ID
      const itemToAdd = {
        ...newNewsItem,
        id: newNewsItem.id || `news-${Date.now()}`
      };
      
      // Create a new array with the added item
      const newNewsItems = [...newsItems, itemToAdd];
      
      // Save to localStorage
      localStorage.setItem('newsItems', JSON.stringify(newNewsItems));
      
      // Update state
      setNewsItems(newNewsItems);
      console.log("News item added successfully:", itemToAdd.id);
      
      return true;
    } catch (error) {
      console.error("Failed to add news item:", error);
      throw error;
    }
  };

  const deleteNewsItem = (id: string) => {
    try {
      console.log("Deleting news item:", id);
      
      // Check if item exists
      const existingItem = newsItems.find(item => item.id === id);
      if (!existingItem) {
        throw new Error(`News item with ID ${id} not found`);
      }
      
      // Filter out the item to delete
      const newNewsItems = newsItems.filter(item => item.id !== id);
      
      // Save to localStorage
      localStorage.setItem('newsItems', JSON.stringify(newNewsItems));
      
      // Update state
      setNewsItems(newNewsItems);
      console.log("News item deleted successfully:", id);
      
      return true;
    } catch (error) {
      console.error("Failed to delete news item:", error);
      throw error;
    }
  };

  // Function to reset all data to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      localStorage.removeItem('projects');
      localStorage.removeItem('teamMembers');
      localStorage.removeItem('newsItems');
      setTeamMembers(initialTeamMembers);
      
      // Update projects with default gradients based on default team members
      const projectsWithGradients = updateProjectGradients(initialProjects, initialTeamMembers);
      setProjects(projectsWithGradients);
      setNewsItems(initialNewsItems);
      
      alert('Data has been reset to defaults.');
    }
  };

  return (
    <ContentContext.Provider value={{
      projects,
      teamMembers,
      newsItems,
      updateProject,
      addProject,
      deleteProject,
      updateTeamMember,
      addTeamMember,
      deleteTeamMember,
      updateNewsItem,
      addNewsItem,
      deleteNewsItem,
      resetToDefaults
    }}>
      {children}
    </ContentContext.Provider>
  );
};
