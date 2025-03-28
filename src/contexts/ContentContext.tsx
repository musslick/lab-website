import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { TeamMember, teamMembers as initialTeamMembers } from '../data/team';
import { NewsItem, newsItems as initialNewsItems } from '../data/news';
import { Collaborator, collaborators as initialCollaborators } from '../data/collaborators';
import { Publication, publications as initialPublications } from '../data/publications';
import { Software, software as initialSoftware } from '../data/software';
import { createGradient, generateTopicColor, createProjectGradient, hexToHsl } from '../utils/colorUtils';

interface ContentContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  newsItems: NewsItem[];
  collaborators: Collaborator[];
  publications: Publication[];
  software: Software[];
  updateProject: (updatedProject: Project) => void;
  addProject: (newProject: Project) => Project;
  deleteProject: (id: string) => void;
  updateTeamMember: (updatedMember: TeamMember) => void;
  addTeamMember: (newMember: TeamMember) => TeamMember;
  deleteTeamMember: (id: string) => void;
  updateNewsItem: (updatedNewsItem: NewsItem) => void;
  addNewsItem: (newNewsItem: NewsItem) => NewsItem;
  deleteNewsItem: (id: string) => void;
  updateCollaborator: (updatedCollaborator: Collaborator) => void;
  addCollaborator: (newCollaborator: Collaborator) => Collaborator;
  deleteCollaborator: (id: string) => void;
  updatePublication: (updatedPublication: Publication) => void;
  addPublication: (newPublication: Publication) => Publication;
  deletePublication: (id: string) => void;
  updateSoftware: (updatedSoftware: Software) => void;
  addSoftware: (newSoftware: Software) => Software;
  deleteSoftware: (id: string) => void;
  resetToDefaults: () => void;
  getTeamMemberById: (id: string) => TeamMember | undefined;
  getProjectById: (id: string) => Project | undefined;
  getNewsItemById: (id: string) => NewsItem | undefined;
  getCollaboratorById: (id: string) => Collaborator | undefined;
  getPublicationById: (id: string) => Publication | undefined;
  getSoftwareById: (id: string) => Software | undefined;
}

const ContentContext = createContext<ContentContextType>({
  projects: [],
  teamMembers: [],
  newsItems: [],
  collaborators: [],
  publications: [],
  software: [],
  updateProject: () => {},
  addProject: () => ({ id: '', title: '', description: '', category: '', team: [], color: '' }),
  deleteProject: () => {},
  updateTeamMember: () => {},
  addTeamMember: () => ({ id: '', name: '', role: '', bio: '', imageUrl: '', color: '', projects: [] }),
  deleteTeamMember: () => {},
  updateNewsItem: () => {},
  addNewsItem: () => ({ id: '', title: '', content: '', date: '', author: '', tags: [] }),
  deleteNewsItem: () => {},
  updateCollaborator: () => {},
  addCollaborator: () => ({ id: '', name: '', url: '' }),
  deleteCollaborator: () => {},
  updatePublication: () => {},
  addPublication: () => ({ 
    id: '', 
    title: '', 
    authors: [], 
    journal: '', 
    year: 0, 
    type: 'journal', 
    citation: '' 
  }),
  deletePublication: () => {},
  updateSoftware: () => {},
  addSoftware: () => ({
    id: '',
    name: '',
    description: '',
    repoUrl: '',
    technologies: [],
    developers: [],
    license: ''
  }),
  deleteSoftware: () => {},
  resetToDefaults: () => {},
  getTeamMemberById: () => undefined,
  getProjectById: () => undefined,
  getNewsItemById: () => undefined,
  getCollaboratorById: () => undefined,
  getPublicationById: () => undefined,
  getSoftwareById: () => undefined,
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
  const [publications, setPublications] = useState<Publication[]>([]);
  const [software, setSoftware] = useState<Software[]>([]);

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
        const savedPublications = localStorage.getItem('publications');
        const savedSoftware = localStorage.getItem('software');
  
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
        
        if (savedPublications) {
          setPublications(JSON.parse(savedPublications));
        } else {
          setPublications(initialPublications);
        }
        
        if (savedSoftware) {
          setSoftware(JSON.parse(savedSoftware));
        } else {
          setSoftware(initialSoftware);
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
        setPublications(initialPublications);
        setSoftware(initialSoftware);
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

  // Software management functions
  const saveSoftware = (updatedSoftware: Software[]) => {
    try {
      localStorage.setItem('software', JSON.stringify(updatedSoftware));
      setSoftware(updatedSoftware);
    } catch (error) {
      console.error("Error saving software to localStorage:", error);
      alert("Failed to save software. LocalStorage might be full or unavailable.");
    }
  };

  const updateSoftware = (updatedSoftware: Software) => {
    const newSoftwareList = software.map(item => 
      item.id === updatedSoftware.id ? updatedSoftware : item
    );
    saveSoftware(newSoftwareList);
  };

  const addSoftware = (newSoftware: Software): Software => {
    try {
      // Ensure unique ID
      const softwareId = newSoftware.id || `software-${Date.now()}`;
      const softwareWithId = {
        ...newSoftware,
        id: softwareId
      };
      
      const newSoftwareList = [...software, softwareWithId];
      saveSoftware(newSoftwareList);
      
      return softwareWithId;
    } catch (error) {
      console.error("Failed to add software:", error);
      throw error;
    }
  };

  const deleteSoftware = (id: string) => {
    const newSoftwareList = software.filter(item => item.id !== id);
    saveSoftware(newSoftwareList);
  };

  // Get software by ID
  const getSoftwareById = (id: string): Software | undefined => {
    return software.find(item => item.id === id);
  };

  // Publication management functions
  const savePublications = (updatedPublications: Publication[]) => {
    try {
      localStorage.setItem('publications', JSON.stringify(updatedPublications));
      setPublications(updatedPublications);
    } catch (error) {
      console.error("Error saving publications to localStorage:", error);
      alert("Failed to save publications. LocalStorage might be full or unavailable.");
    }
  };

  const updatePublication = (updatedPublication: Publication) => {
    const newPublications = publications.map(pub => 
      pub.id === updatedPublication.id ? updatedPublication : pub
    );
    savePublications(newPublications);
  };

  const addPublication = (newPublication: Publication): Publication => {
    try {
      // Ensure unique ID
      const pubId = newPublication.id || `pub-${Date.now()}`;
      const pubWithId = {
        ...newPublication,
        id: pubId
      };
      
      const newPublications = [...publications, pubWithId];
      savePublications(newPublications);
      
      return pubWithId;
    } catch (error) {
      console.error("Failed to add publication:", error);
      throw error;
    }
  };

  const deletePublication = (id: string) => {
    const newPublications = publications.filter(pub => pub.id !== id);
    savePublications(newPublications);
  };

  // Function to reset all data to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      localStorage.removeItem('projects');
      localStorage.removeItem('teamMembers');
      localStorage.removeItem('newsItems');
      localStorage.removeItem('collaborators');
      localStorage.removeItem('publications');
      localStorage.removeItem('software');
      setTeamMembers(initialTeamMembers);
      
      // Update projects with default gradients based on default team members
      const projectsWithGradients = updateProjectGradients(initialProjects, initialTeamMembers);
      setProjects(projectsWithGradients);
      setNewsItems(initialNewsItems);
      setCollaborators(initialCollaborators);
      setPublications(initialPublications);
      setSoftware(initialSoftware);
      
      alert('Data has been reset to defaults.');
    }
  };

  // Add function to get team member by ID
  const getTeamMemberById = (id: string): TeamMember | undefined => {
    return teamMembers.find(member => member.id === id);
  };

  // Add function to get project by ID
  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  // Add function to get news item by ID
  const getNewsItemById = (id: string): NewsItem | undefined => {
    return newsItems.find(newsItem => newsItem.id === id);
  };

  // Add function to get collaborator by ID
  const getCollaboratorById = (id: string): Collaborator | undefined => {
    return collaborators.find(collaborator => collaborator.id === id);
  };

  // Add function to get publication by ID
  const getPublicationById = (id: string): Publication | undefined => {
    return publications.find(publication => publication.id === id);
  };

  // Project management functions
  const updateProject = (updatedProject: Project) => {
    console.log("Updating project:", updatedProject);
    
    // Get the existing project to compare changes
    const existingProject = projects.find(p => p.id === updatedProject.id);
    
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
    
    // Update team members if the project team has changed
    if (existingProject && !areArraysEqual(existingProject.team, updatedProject.team)) {
      const updatedTeamMembers = teamMembers.map(member => {
        // Remove project from members no longer in the team
        if (existingProject.team.includes(member.name) && !updatedProject.team.includes(member.name)) {
          return {
            ...member,
            projects: member.projects?.filter(id => id !== updatedProject.id) || []
          };
        }
        // Add project to new team members
        if (!existingProject.team.includes(member.name) && updatedProject.team.includes(member.name)) {
          return {
            ...member,
            projects: [...(member.projects || []), updatedProject.id]
          };
        }
        return member;
      });
      
      // Save updated team members
      saveTeamMembers(updatedTeamMembers);
    }
    
    // Save projects and emit update event
    saveProjects(newProjects);
    window.dispatchEvent(new CustomEvent('project-updated', {
      detail: { projectId: updatedProject.id, timestamp: Date.now() }
    }));
  };
  
  // Utility function to compare arrays
  const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(item => arr2.includes(item));
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
    
    saveTeamMembers(newTeamMembers);
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
      
      const updatedMembers = [...teamMembers, memberWithId];
      saveTeamMembers(updatedMembers);
      
      return memberWithId;
    } catch (error) {
      console.error("Failed to add team member:", error);
      throw error;
    }
  };

  const deleteTeamMember = (id: string) => {
    const memberToDelete = teamMembers.find(member => member.id === id);
    const newTeamMembers = teamMembers.filter(member => member.id !== id);
    
    // Update projects that reference this member
    if (memberToDelete) {
      const updatedProjects = projects.map(project => {
        if (project.team.includes(memberToDelete.name)) {
          // Remove this member from the team
          const updatedTeam = project.team.filter(name => name !== memberToDelete.name);
          
          // Create a new gradient based on remaining team members
          const updatedColor = updatedTeam.length > 0 
            ? createGradient(updatedTeam.map(name => {
                const member = newTeamMembers.find(m => m.name === name);
                return member ? member.color : '#CCCCCC';
              }), {
                includeHighlight: true,
                highlightColor: '#00AAFF',
                mixColors: true,
                mixRatio: 0.3,
                type: 'radial',
                position: 'circle at center'
              })
            : 'radial-gradient(circle at center, #FF5733 0%, #00AAFF 100%)';
          
          return {
            ...project,
            team: updatedTeam,
            color: updatedColor
          };
        }
        return project;
      });
      
      saveProjects(updatedProjects);
    }
    
    saveTeamMembers(newTeamMembers);
  };

  // News item management functions
  const updateNewsItem = (updatedNewsItem: NewsItem) => {
    try {
      const newNewsItems = newsItems.map(item => 
        item.id === updatedNewsItem.id ? updatedNewsItem : item
      );
      saveNewsItems(newNewsItems);
      return true;
    } catch (error) {
      console.error("Error updating news item:", error);
      throw error;
    }
  };

  const addNewsItem = (newNewsItem: NewsItem): NewsItem => {
    try {
      // Ensure unique ID
      const newsId = newNewsItem.id || `news-${Date.now()}`;
      const itemWithId = {
        ...newNewsItem,
        id: newsId
      };
      
      const newNewsItems = [...newsItems, itemWithId];
      saveNewsItems(newNewsItems);
      
      return itemWithId;
    } catch (error) {
      console.error("Failed to add news item:", error);
      throw error;
    }
  };

  const deleteNewsItem = (id: string) => {
    try {
      const newNewsItems = newsItems.filter(item => item.id !== id);
      saveNewsItems(newNewsItems);
      return true;
    } catch (error) {
      console.error("Failed to delete news item:", error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider value={{
      projects,
      teamMembers,
      newsItems,
      collaborators,
      publications,
      software,
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
      updatePublication,
      addPublication,
      deletePublication,
      updateSoftware,
      addSoftware,
      deleteSoftware,
      resetToDefaults,
      getTeamMemberById,
      getProjectById,
      getNewsItemById,
      getCollaboratorById,
      getPublicationById,
      getSoftwareById
    }}>
      {children}
    </ContentContext.Provider>
  );
};
