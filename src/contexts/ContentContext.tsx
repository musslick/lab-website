import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { TeamMember, teamMembers as initialTeamMembers } from '../data/team';
import { NewsItem, newsItems as initialNewsItems } from '../data/news';
import { Collaborator, collaborators as initialCollaborators } from '../data/collaborators';
import { createGradient, generateTopicColor, createProjectGradient } from '../utils/colorUtils';

interface ContentContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  newsItems: NewsItem[];
  collaborators: Collaborator[];
  updateProject: (updatedProject: Project) => void;
  addProject: (newProject: Project) => Project; // Updated return type
  deleteProject: (id: string) => void;
  updateTeamMember: (updatedMember: TeamMember) => void;
  addTeamMember: (newMember: TeamMember) => TeamMember; // Updated return type
  deleteTeamMember: (id: string) => void;
  updateNewsItem: (updatedNewsItem: NewsItem) => void;
  addNewsItem: (newNewsItem: NewsItem) => NewsItem; // Updated return type
  deleteNewsItem: (id: string) => void;
  updateCollaborator: (updatedCollaborator: Collaborator) => void;
  addCollaborator: (newCollaborator: Collaborator) => Collaborator;
  deleteCollaborator: (id: string) => void;
  resetToDefaults: () => void;
  getTeamMemberById: (id: string) => TeamMember | undefined; // Add this method
}

const ContentContext = createContext<ContentContextType>({
  projects: [],
  teamMembers: [],
  newsItems: [],
  collaborators: [],
  updateProject: () => {},
  addProject: () => ({ id: '', title: '', description: '', category: '', team: [], color: '' }), // Updated with dummy return
  deleteProject: () => {},
  updateTeamMember: () => {},
  addTeamMember: () => ({ id: '', name: '', role: '', bio: '', imageUrl: '', color: '', projects: [] }), // Updated with dummy return
  deleteTeamMember: () => {},
  updateNewsItem: () => {},
  addNewsItem: () => ({ id: '', title: '', content: '', date: '', author: '', tags: [] }), // Updated with dummy return
  deleteNewsItem: () => {},
  updateCollaborator: () => {},
  addCollaborator: () => ({ id: '', name: '', url: '' }),
  deleteCollaborator: () => {},
  resetToDefaults: () => {},
  getTeamMemberById: () => undefined, // Add this method
});

export const useContent = () => useContext(ContentContext);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

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
          color: 'radial-gradient(circle at center, #FF5733 0%, #00AAFF 100%)'
        };
      }
      
      // Generate a new gradient based on team members' colors
      const gradient = createGradient(teamColors, {
        includeHighlight: true,
        highlightColor: '#00AAFF', // Lab blue always at outer edge
        mixColors: true,
        mixRatio: 0.3,
        type: 'radial',
        position: 'circle at center'
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
        const savedCollaborators = localStorage.getItem('collaborators');
  
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
        
        if (savedCollaborators) {
          setCollaborators(JSON.parse(savedCollaborators));
        } else {
          setCollaborators(initialCollaborators);
        }
        
        // Save the updated projects if necessary
        if (savedProjects && JSON.stringify(updatedProjects) !== savedProjects) {
          localStorage.setItem('projects', JSON.stringify(updatedProjects));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setProjects(initialProjects);
        setTeamMembers(initialTeamMembers);
        setNewsItems(initialNewsItems);
        setCollaborators(initialCollaborators);
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

  // Collaborator management functions
  const saveCollaborators = (updatedCollaborators: Collaborator[]) => {
    try {
      localStorage.setItem('collaborators', JSON.stringify(updatedCollaborators));
      setCollaborators(updatedCollaborators);
    } catch (error) {
      console.error("Error saving collaborators to localStorage:", error);
      alert("Failed to save collaborators. LocalStorage might be full or unavailable.");
    }
  };

  const updateCollaborator = (updatedCollaborator: Collaborator) => {
    const newCollaborators = collaborators.map(collab => 
      collab.id === updatedCollaborator.id ? updatedCollaborator : collab
    );
    saveCollaborators(newCollaborators);
  };

  const addCollaborator = (newCollaborator: Collaborator): Collaborator => {
    try {
      // Ensure unique ID
      const collabId = newCollaborator.id || `collab-${Date.now()}`;
      const collabWithId = {
        ...newCollaborator,
        id: collabId
      };
      
      const newCollaborators = [...collaborators, collabWithId];
      saveCollaborators(newCollaborators);
      
      return collabWithId;
    } catch (error) {
      console.error("Failed to add collaborator:", error);
      throw error;
    }
  };

  const deleteCollaborator = (id: string) => {
    const newCollaborators = collaborators.filter(collab => collab.id !== id);
    saveCollaborators(newCollaborators);
  };

  // Project management functions
  const updateProject = (updatedProject: Project) => {
    console.log("Updating project:", updatedProject);
    
    // Ensure topics have consistent colors
    let projectWithConsistentColors = { ...updatedProject };
    
    // If the project has topics, ensure we have topic colors
    if (updatedProject.topics && updatedProject.topics.length > 0) {
      // Generate colors for topics if they don't exist or are inconsistent
      const topicsWithColors = updatedProject.topics.map((topic, index) => {
        // Check if we already have this topic with a color
        const existingTopicWithColor = updatedProject.topicsWithColors?.find(t => t.name === topic);
        
        if (existingTopicWithColor) {
          // Use the existing color
          return existingTopicWithColor;
        } else {
          // Generate a new color for this topic
          const color = generateTopicColor('#00AAFF', index, updatedProject.topics!.length);
          const [h, s, l] = hexToHsl(color);
          return {
            name: topic,
            color,
            hue: h // Store the hue for future reference
          };
        }
      });
      
      projectWithConsistentColors = {
        ...projectWithConsistentColors,
        topicsWithColors
      };
    }
    
    // Generate a new gradient based on topic colors
    const projectWithUpdatedColor = {
      ...projectWithConsistentColors,
      color: createProjectGradient(projectWithConsistentColors, '#00AAFF'),
      _lastUpdated: Date.now() // Add timestamp for cache busting
    };
    
    // Create a new array to ensure state update is triggered
    const newProjects = projects.map(project => 
      project.id === updatedProject.id ? projectWithUpdatedColor : project
    );
    
    // Save to storage and update state
    saveProjects(newProjects);
    
    // Emit an event for components that need to know about the update
    window.dispatchEvent(new CustomEvent('project-updated', {
      detail: { projectId: updatedProject.id, timestamp: Date.now() }
    }));
    
    // Force a re-render of the project page
    setTimeout(() => {
      // This timeout gives the browser time to process the state update
      console.log("Project update completed:", updatedProject.id);
    }, 100);
  };

  const addProject = (newProject: Project): Project => {
    try {
      console.log("Adding new project:", newProject.title);
      
      // Ensure unique ID
      const projectId = newProject.id || `project-${Date.now()}`;
      const projectWithId = {
        ...newProject,
        id: projectId
      };
      
      // If the project has topics, ensure we have topic colors
      let projectWithTopicColors = { ...projectWithId };
      
      if (newProject.topics && newProject.topics.length > 0) {
        const topicsWithColors = newProject.topics.map((topic, index) => {
          const color = generateTopicColor('#00AAFF', index, newProject.topics!.length);
          const [h, s, l] = hexToHsl(color);
          return {
            name: topic,
            color,
            hue: h // Store the hue for future reference
          };
        });
        
        projectWithTopicColors = {
          ...projectWithTopicColors,
          topicsWithColors
        };
      }
      
      // Generate a gradient for the project using topic colors
      const projectWithColor = {
        ...projectWithTopicColors,
        color: createProjectGradient(projectWithTopicColors, '#00AAFF')
      };
      
      // Create a new projects array with the added project
      const newProjects = [...projects, projectWithColor];
      
      // Set state first for immediate UI update
      setProjects(newProjects);
      
      // Then save to localStorage
      try {
        localStorage.setItem('projects', JSON.stringify(newProjects));
        console.log("Project saved to localStorage:", projectWithColor.title);
      } catch (storageError) {
        console.error("Failed to save projects to localStorage:", storageError);
      }
      
      // Emit event to notify other components
      window.dispatchEvent(new CustomEvent('project-added', {
        detail: { projectId: projectWithColor.id, timestamp: Date.now() }
      }));
      
      return projectWithColor; // Return the created project
    } catch (error) {
      console.error("Failed to add project:", error);
      throw error;
    }
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
    // Make sure we have the latest data
    const previousMember = teamMembers.find(m => m.id === updatedMember.id);
    
    // Ensure color is properly set
    const memberWithColor = {
      ...updatedMember,
      color: updatedMember.color || previousMember?.color || '#000000'
    };
    
    const newTeamMembers = teamMembers.map(member => 
      member.id === memberWithColor.id ? memberWithColor : member
    );
    
    // First update team members
    setTeamMembers(newTeamMembers);
    
    // Save to localStorage immediately to ensure colors are persisted
    try {
      localStorage.setItem('teamMembers', JSON.stringify(newTeamMembers));
      console.log("Team member updated with color:", memberWithColor.color);
    } catch (error) {
      console.error("Error saving team members to localStorage:", error);
    }
    
    // Track if we need to update projects
    let projectsNeedUpdate = false;
    let updatedProjects = [...projects];
    
    // If name changed, update all projects that include this team member
    if (previousMember && previousMember.name !== memberWithColor.name) {
      updatedProjects = projects.map(project => {
        if (project.team.includes(previousMember.name)) {
          // Replace old name with new name in the team array
          const updatedTeam = project.team.map(name => 
            name === previousMember.name ? memberWithColor.name : name
          );
          projectsNeedUpdate = true;
          return { ...project, team: updatedTeam };
        }
        return project;
      });
    }
    
    // If color changed or projects were updated due to name change, update project colors
    if ((previousMember && previousMember.color !== memberWithColor.color) || projectsNeedUpdate) {
      updatedProjects = updatedProjects.map(project => {
        if (project.team.includes(memberWithColor.name)) {
          // Get the updated team colors
          const teamColors = project.team.map(memberName => {
            if (memberName === memberWithColor.name) return memberWithColor.color;
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
              type: 'radial',
              position: 'circle at center'
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
    
    // If the member has project IDs, ensure this member is part of those projects' teams
    if (updatedMember.projects && updatedMember.projects.length > 0) {
      const projectsToUpdate = [...updatedProjects];
      let hasChanges = false;
      
      updatedMember.projects.forEach(projectId => {
        const projectIndex = projectsToUpdate.findIndex(p => p.id === projectId);
        if (projectIndex >= 0) {
          const project = projectsToUpdate[projectIndex];
          if (!project.team.includes(updatedMember.name)) {
            // Add member to project team if not already there
            projectsToUpdate[projectIndex] = {
              ...project,
              team: [...project.team, updatedMember.name]
            };
            hasChanges = true;
          }
        }
      });
      
      if (hasChanges) {
        // Update project colors based on new team composition
        const finalProjects = projectsToUpdate.map(project => {
          if (updatedMember.projects?.includes(project.id)) {
            const teamColors = project.team.map(memberName => {
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
                type: 'radial',
                position: 'circle at center'
              })
            };
          }
          return project;
        });
        
        saveProjects(finalProjects);
      }
    }
  };

  const addTeamMember = (newMember: TeamMember): TeamMember => {
    try {
      console.log("Adding new team member:", newMember.name);
      
      // Ensure unique ID
      const memberId = newMember.id || `member-${Date.now()}`;
      
      // Ensure color is set, use default if not provided
      const memberWithId = {
        ...newMember,
        id: memberId,
        color: newMember.color || '#000000'
      };
      
      console.log("Team member color being saved:", memberWithId.color);
      
      // Create a new array with the new member
      const updatedMembers = [...teamMembers, memberWithId];
      
      // Set state first for immediate UI update
      setTeamMembers(updatedMembers);
      
      // Then save to localStorage
      try {
        localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
        console.log("Team member saved to localStorage:", memberWithId.name);
      } catch (storageError) {
        console.error("Failed to save team members to localStorage:", storageError);
      }
      
      // If the member has project IDs, ensure this member is part of those projects' teams
      if (memberWithId.projects && memberWithId.projects.length > 0) {
        const projectsToUpdate = [...projects];
        let hasChanges = false;
        
        memberWithId.projects.forEach(projectId => {
          const projectIndex = projectsToUpdate.findIndex(p => p.id === projectId);
          if (projectIndex >= 0) {
            const project = projectsToUpdate[projectIndex];
            if (!project.team.includes(memberWithId.name)) {
              // Add member to project team if not already there
              projectsToUpdate[projectIndex] = {
                ...project,
                team: [...project.team, memberWithId.name]
              };
              hasChanges = true;
            }
          }
        });
        
        if (hasChanges) {
          // Update project colors based on new team composition
          const updatedProjects = projectsToUpdate.map(project => {
            if (memberWithId.projects?.includes(project.id)) {
              const teamColors = project.team.map(memberName => {
                // Get color for the new member or other team members
                if (memberName === memberWithId.name) return memberWithId.color;
                const member = updatedMembers.find(m => m.name === memberName);
                return member ? member.color : '#CCCCCC';
              });
              
              return {
                ...project,
                color: createGradient(teamColors, {
                  includeHighlight: true,
                  highlightColor: '#00AAFF',
                  mixColors: true,
                  mixRatio: 0.3,
                  type: 'radial',
                  position: 'circle at center'
                })
              };
            }
            return project;
          });
          
          saveProjects(updatedProjects);
        }
      }
      
      // Emit event to notify other components
      window.dispatchEvent(new CustomEvent('member-added', {
        detail: { memberId: memberWithId.id, name: memberWithId.name, timestamp: Date.now() }
      }));
      
      return memberWithId; // Return the created member
    } catch (error) {
      console.error("Failed to add team member:", error);
      throw error;
    }
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
                type: 'radial',
                position: 'circle at center'
              })
            : 'radial-gradient(circle at center, #FF5733 0%, #00AAFF 100%)'; // Default gradient if no members left
          
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

  const addNewsItem = (newNewsItem: NewsItem): NewsItem => {
    try {
      console.log("Adding news item:", newNewsItem.title);
      
      // Ensure the item has an ID
      const newsId = newNewsItem.id || `news-${Date.now()}`;
      const itemToAdd = {
        ...newNewsItem,
        id: newsId
      };
      
      // Create a new array with the added item
      const newNewsItems = [...newsItems, itemToAdd];
      
      // Update state first for immediate UI update
      setNewsItems(newNewsItems);
      
      // Then save to localStorage
      try {
        localStorage.setItem('newsItems', JSON.stringify(newNewsItems));
        console.log("News item saved to localStorage:", itemToAdd.title);
      } catch (storageError) {
        console.error("Failed to save news items to localStorage:", storageError);
      }
      
      // Emit event to notify other components
      window.dispatchEvent(new CustomEvent('news-added', {
        detail: { newsId: itemToAdd.id, title: itemToAdd.title, timestamp: Date.now() }
      }));
      
      return itemToAdd; // Return the created news item
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
      localStorage.removeItem('collaborators');
      setTeamMembers(initialTeamMembers);
      
      // Update projects with default gradients based on default team members
      const projectsWithGradients = updateProjectGradients(initialProjects, initialTeamMembers);
      setProjects(projectsWithGradients);
      setNewsItems(initialNewsItems);
      setCollaborators(initialCollaborators);
      
      alert('Data has been reset to defaults.');
    }
  };

  // Add function to get team member by ID
  const getTeamMemberById = (id: string): TeamMember | undefined => {
    return teamMembers.find(member => member.id === id);
  };

  return (
    <ContentContext.Provider value={{
      projects,
      teamMembers,
      newsItems,
      collaborators,
      updateProject,
      addProject,
      deleteProject,
      updateTeamMember,
      addTeamMember,
      deleteTeamMember,
      updateNewsItem,
      addNewsItem,
      deleteNewsItem,
      updateCollaborator,
      addCollaborator,
      deleteCollaborator,
      resetToDefaults,
      getTeamMemberById // Include the new method
    }}>
      {children}
    </ContentContext.Provider>
  );
};
