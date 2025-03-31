import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { TeamMember, teamMembers as initialTeamMembers } from '../data/team';
import { NewsItem, newsItems as initialNewsItems } from '../data/news';
import { Collaborator, collaborators as initialCollaborators } from '../data/collaborators';
import { FundingSource, fundingSources as initialFundingSources } from '../data/funding';
import { Publication, publications as initialPublications } from '../data/publications';
import { Software, software as initialSoftware } from '../data/software';
import { JobOpening, jobOpenings as initialJobOpenings } from '../data/jobOpenings';
import { createGradient, generateTopicColor, createProjectGradient, hexToHsl } from '../utils/colorUtils';

interface ContentContextType {
  projects: Project[];
  teamMembers: TeamMember[];
  newsItems: NewsItem[];
  collaborators: Collaborator[];
  publications: Publication[];
  software: Software[];
  jobOpenings: JobOpening[];
  fundingSources: FundingSource[];
  updateProject: (updatedProject: Project) => void;
  addProject: (newProject: Project) => Project;
  deleteProject: (id: string) => void;
  reorderProjects: (projectIds: string[]) => void;
  reorderTeamMembers: (teamMemberIds: string[]) => void; // New method for reordering team members
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
  updateJobOpening: (updatedJobOpening: JobOpening) => void;
  addJobOpening: (newJobOpening: JobOpening) => JobOpening;
  deleteJobOpening: (id: string) => void;
  updateFundingSource: (updatedFunding: FundingSource) => void;
  addFundingSource: (newFunding: FundingSource) => FundingSource;
  deleteFundingSource: (id: string) => void;
  resetToDefaults: () => void;
  getTeamMemberById: (id: string) => TeamMember | undefined;
  getProjectById: (id: string) => Project | undefined;
  getNewsItemById: (id: string) => NewsItem | undefined;
  getCollaboratorById: (id: string) => Collaborator | undefined;
  getPublicationById: (id: string) => Publication | undefined;
  getSoftwareById: (id: string) => Software | undefined;
  getJobOpeningById: (id: string) => JobOpening | undefined;
  getFundingSourceById: (id: string) => FundingSource | undefined;

  // Add these new methods
  setFeaturedProject: (projectId: string) => void;
  setFeaturedNewsItem: (newsItemId: string) => void;
  setFeaturedPublication: (publicationId: string) => void;
  getFeaturedItems: () => {
    projectId: string | null;
    newsItemId: string | null;
    publicationId: string | null;
  };

  // Add team image methods
  getTeamImage: () => string;
  updateTeamImage: (imageUrl: string) => void;

  // Add new methods for image positioning
  getTeamImagePosition: () => string;
  updateTeamImagePosition: (position: string) => void;
}

// Export the ContentContext
export const ContentContext = createContext<ContentContextType>({
  projects: [],
  teamMembers: [],
  newsItems: [],
  collaborators: [],
  publications: [],
  software: [],
  jobOpenings: [],
  fundingSources: [],
  updateProject: () => {},
  addProject: () => ({ id: '', title: '', description: '', category: '', team: [], color: '' }),
  deleteProject: () => {},
  reorderProjects: () => {}, // Default implementation for reorderProjects
  reorderTeamMembers: () => {}, // Add default implementation
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
  updateJobOpening: () => {},
  addJobOpening: () => ({
    id: '',
    title: '',
    description: '',
    requirements: [],
    type: 'full-time',
    location: '',
    postedDate: '',
    isOpen: true,
  }),
  deleteJobOpening: () => {},
  updateFundingSource: () => {},
  addFundingSource: () => ({ id: '', name: '', url: '' }),
  deleteFundingSource: () => {},
  resetToDefaults: () => {},
  getTeamMemberById: () => undefined,
  getProjectById: () => undefined,
  getNewsItemById: () => undefined,
  getCollaboratorById: () => undefined,
  getPublicationById: () => undefined,
  getSoftwareById: () => undefined,
  getJobOpeningById: () => undefined,
  getFundingSourceById: () => undefined,

  // Add these new methods to the default context
  setFeaturedProject: () => {},
  setFeaturedNewsItem: () => {},
  setFeaturedPublication: () => {},
  getFeaturedItems: () => ({
    projectId: null,
    newsItemId: null,
    publicationId: null
  }),

  // Add default implementations
  getTeamImage: () => '/assets/lab_team.jpeg',
  updateTeamImage: () => {},

  // Add default implementations for image positioning
  getTeamImagePosition: () => 'center',
  updateTeamImagePosition: () => {},
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
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);

  // Add state for featured items
  const [featuredProject, setFeaturedProject] = useState<string | null>(null);
  const [featuredNewsItem, setFeaturedNewsItem] = useState<string | null>(null);
  const [featuredPublication, setFeaturedPublication] = useState<string | null>(null);

  // Add state for team image
  const [teamImage, setTeamImage] = useState<string>('/assets/lab_team.jpeg');
  // Add state for team image position (default to 'center')
  const [teamImagePosition, setTeamImagePosition] = useState<string>('center');

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
        const savedJobOpenings = localStorage.getItem('jobOpenings');
        const savedFundingSources = localStorage.getItem('fundingSources');
  
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

        if (savedJobOpenings) {
          setJobOpenings(JSON.parse(savedJobOpenings));
        } else {
          setJobOpenings(initialJobOpenings);
        }

        if (savedFundingSources) {
          setFundingSources(JSON.parse(savedFundingSources));
        } else {
          setFundingSources(initialFundingSources);
        }

        // Load featured items
        const savedFeaturedItems = localStorage.getItem('featuredItems');
        if (savedFeaturedItems) {
          const featuredItems = JSON.parse(savedFeaturedItems);
          setFeaturedProject(featuredItems.projectId || null);
          setFeaturedNewsItem(featuredItems.newsItemId || null);
          setFeaturedPublication(featuredItems.publicationId || null);
        } else {
          // Default to first items if available
          setFeaturedProject(projectsData.length > 0 ? projectsData[0].id : null);
          setFeaturedNewsItem(newsData.length > 0 ? newsData[0].id : null);
          setFeaturedPublication(initialPublications.length > 0 ? initialPublications[0].id : null);
        }

        // Load team image
        const savedTeamImage = localStorage.getItem('teamImage');
        if (savedTeamImage) {
          setTeamImage(savedTeamImage);
        }

        // Load team image position
        const savedTeamImagePosition = localStorage.getItem('teamImagePosition');
        if (savedTeamImagePosition) {
          setTeamImagePosition(savedTeamImagePosition);
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
        setJobOpenings(initialJobOpenings);
        setFundingSources(initialFundingSources);
      }
    };

    loadData();
  }, []);

  // Save featured items
  const saveFeaturedItems = () => {
    try {
      const featuredItems = {
        projectId: featuredProject,
        newsItemId: featuredNewsItem,
        publicationId: featuredPublication
      };
      localStorage.setItem('featuredItems', JSON.stringify(featuredItems));
    } catch (error) {
      console.error("Error saving featured items to localStorage:", error);
    }
  };

  // Update featured project
  const handleSetFeaturedProject = (projectId: string) => {
    setFeaturedProject(projectId);
    setTimeout(() => saveFeaturedItems(), 0);
  };

  // Update featured news item
  const handleSetFeaturedNewsItem = (newsItemId: string) => {
    setFeaturedNewsItem(newsItemId);
    setTimeout(() => saveFeaturedItems(), 0);
  };

  // Update featured publication
  const handleSetFeaturedPublication = (publicationId: string) => {
    setFeaturedPublication(publicationId);
    setTimeout(() => saveFeaturedItems(), 0);
  };

  // Get all featured items
  const getFeaturedItems = () => {
    return {
      projectId: featuredProject,
      newsItemId: featuredNewsItem,
      publicationId: featuredPublication
    };
  };

  // Get team image function
  const getTeamImage = (): string => {
    return teamImage;
  };
  
  // Update team image function
  const updateTeamImage = (imageUrl: string): void => {
    try {
      setTeamImage(imageUrl);
      localStorage.setItem('teamImage', imageUrl);
    } catch (error) {
      console.error("Error saving team image to localStorage:", error);
    }
  };

  // Get team image position function
  const getTeamImagePosition = (): string => {
    return teamImagePosition;
  };
  
  // Update team image position function
  const updateTeamImagePosition = (position: string): void => {
    try {
      setTeamImagePosition(position);
      localStorage.setItem('teamImagePosition', position);
    } catch (error) {
      console.error("Error saving team image position to localStorage:", error);
    }
  };

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

  // Funding sources management functions
  const saveFundingSources = (updatedFundingSources: FundingSource[]) => {
    try {
      localStorage.setItem('fundingSources', JSON.stringify(updatedFundingSources));
      setFundingSources(updatedFundingSources);
    } catch (error) {
      console.error("Error saving funding sources to localStorage:", error);
      alert("Failed to save funding sources. LocalStorage might be full or unavailable.");
    }
  };

  const updateFundingSource = (updatedFunding: FundingSource) => {
    const newFundingSources = fundingSources.map(source => 
      source.id === updatedFunding.id ? updatedFunding : source
    );
    saveFundingSources(newFundingSources);
  };

  const addFundingSource = (newFunding: FundingSource): FundingSource => {
    try {
      const fundingId = newFunding.id || `funding-${Date.now()}`;
      const fundingWithId = {
        ...newFunding,
        id: fundingId
      };
      
      const newFundingSources = [...fundingSources, fundingWithId];
      saveFundingSources(newFundingSources);
      
      return fundingWithId;
    } catch (error) {
      console.error("Failed to add funding source:", error);
      throw error;
    }
  };

  const deleteFundingSource = (id: string) => {
    const newFundingSources = fundingSources.filter(source => source.id !== id);
    saveFundingSources(newFundingSources);
  };

  const getFundingSourceById = (id: string): FundingSource | undefined => {
    return fundingSources.find(source => source.id === id);
  };

  // Project management functions
  const updateProject = (updatedProject: Project) => {
    const existingProject = projects.find(p => p.id === updatedProject.id);
    let projectWithConsistentColors = { ...updatedProject };

    if (updatedProject.topics && updatedProject.topics.length > 0) {
      const topicsWithColors = updatedProject.topics.map((topic, index) => {
        const existingTopicWithColor = updatedProject.topicsWithColors?.find(t => t.name === topic);

        if (existingTopicWithColor) {
          return existingTopicWithColor;
        } else {
          const color = generateTopicColor('#00AAFF', index, updatedProject.topics!.length);
          const [h, s, l] = hexToHsl(color);
          return {
            name: topic,
            color,
            hue: h
          };
        }
      });

      projectWithConsistentColors = {
        ...projectWithConsistentColors,
        topicsWithColors
      };
    }

    const projectWithUpdatedColor = {
      ...projectWithConsistentColors,
      color: createProjectGradient(projectWithConsistentColors, '#00AAFF'),
      _lastUpdated: Date.now()
    };

    const newProjects = projects.map(project => 
      project.id === updatedProject.id ? projectWithUpdatedColor : project
    );

    if (existingProject && !areArraysEqual(existingProject.team, updatedProject.team)) {
      const updatedTeamMembers = teamMembers.map(member => {
        if (existingProject.team.includes(member.name) && !updatedProject.team.includes(member.name)) {
          return {
            ...member,
            projects: member.projects?.filter(id => id !== updatedProject.id) || []
          };
        }
        if (!existingProject.team.includes(member.name) && updatedProject.team.includes(member.name)) {
          return {
            ...member,
            projects: [...(member.projects || []), updatedProject.id]
          };
        }
        return member;
      });

      saveTeamMembers(updatedTeamMembers);
    }

    saveProjects(newProjects);
    window.dispatchEvent(new CustomEvent('project-updated', {
      detail: { projectId: updatedProject.id, timestamp: Date.now() }
    }));
  };

  const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(item => arr2.includes(item));
  };

  const addProject = (newProject: Project): Project => {
    try {
      const projectId = newProject.id || `project-${Date.now()}`;
      const projectWithId = {
        ...newProject,
        id: projectId
      };

      let projectWithTopicColors = { ...projectWithId };

      if (newProject.topics && newProject.topics.length > 0) {
        const topicsWithColors = newProject.topics.map((topic, index) => {
          const color = generateTopicColor('#00AAFF', index, newProject.topics!.length);
          const [h, s, l] = hexToHsl(color);
          return {
            name: topic,
            color,
            hue: h
          };
        });

        projectWithTopicColors = {
          ...projectWithTopicColors,
          topicsWithColors
        };
      }

      const projectWithColor = {
        ...projectWithTopicColors,
        color: createProjectGradient(projectWithTopicColors, '#00AAFF')
      };

      const newProjects = [...projects, projectWithColor];
      setProjects(newProjects);

      try {
        localStorage.setItem('projects', JSON.stringify(newProjects));
      } catch (storageError) {
        console.error("Failed to save projects to localStorage:", storageError);
      }

      window.dispatchEvent(new CustomEvent('project-added', {
        detail: { projectId: projectWithColor.id, timestamp: Date.now() }
      }));

      return projectWithColor;
    } catch (error) {
      console.error("Failed to add project:", error);
      throw error;
    }
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(project => project.id !== id);
    saveProjects(newProjects);

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

  const reorderProjects = (projectIds: string[]) => {
    const reorderedProjects = projectIds.map(id => projects.find(project => project.id === id)).filter(Boolean) as Project[];
    saveProjects(reorderedProjects);
  };

  const reorderTeamMembers = (teamMemberIds: string[]) => {
    const reorderedTeamMembers = teamMemberIds.map(id => teamMembers.find(member => member.id === id)).filter(Boolean) as TeamMember[];
    saveTeamMembers(reorderedTeamMembers);
  };

  // Team member management functions
  const updateTeamMember = (updatedMember: TeamMember) => {
    const previousMember = teamMembers.find(m => m.id === updatedMember.id);

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
      const memberId = newMember.id || `member-${Date.now()}`;

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

    if (memberToDelete) {
      const updatedProjects = projects.map(project => {
        if (project.team.includes(memberToDelete.name)) {
          const updatedTeam = project.team.filter(name => name !== memberToDelete.name);

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

  // Job openings management functions
  const saveJobOpenings = (updatedJobOpenings: JobOpening[]) => {
    try {
      localStorage.setItem('jobOpenings', JSON.stringify(updatedJobOpenings));
      setJobOpenings(updatedJobOpenings);
    } catch (error) {
      console.error("Error saving job openings to localStorage:", error);
      alert("Failed to save job openings. LocalStorage might be full or unavailable.");
    }
  };

  const updateJobOpening = (updatedJobOpening: JobOpening) => {
    const newJobOpenings = jobOpenings.map(job => 
      job.id === updatedJobOpening.id ? updatedJobOpening : job
    );
    saveJobOpenings(newJobOpenings);
  };

  const addJobOpening = (newJobOpening: JobOpening): JobOpening => {
    try {
      const jobId = newJobOpening.id || `job-${Date.now()}`;
      const jobWithId = {
        ...newJobOpening,
        id: jobId
      };
      
      const newJobOpenings = [...jobOpenings, jobWithId];
      saveJobOpenings(newJobOpenings);
      
      return jobWithId;
    } catch (error) {
      console.error("Failed to add job opening:", error);
      throw error;
    }
  };

  const deleteJobOpening = (id: string) => {
    const newJobOpenings = jobOpenings.filter(job => job.id !== id);
    saveJobOpenings(newJobOpenings);
  };

  const getJobOpeningById = (id: string): JobOpening | undefined => {
    return jobOpenings.find(job => job.id === id);
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
      localStorage.removeItem('jobOpenings');
      localStorage.removeItem('featuredItems');
      localStorage.removeItem('fundingSources');
      localStorage.removeItem('teamImage');
      localStorage.removeItem('teamImagePosition');
      setTeamMembers(initialTeamMembers);
      
      const projectsWithGradients = updateProjectGradients(initialProjects, initialTeamMembers);
      setProjects(projectsWithGradients);
      setNewsItems(initialNewsItems);
      setCollaborators(initialCollaborators);
      setPublications(initialPublications);
      setSoftware(initialSoftware);
      setJobOpenings(initialJobOpenings);
      setFundingSources(initialFundingSources);

      // Reset featured items
      setFeaturedProject(initialProjects.length > 0 ? initialProjects[0].id : null);
      setFeaturedNewsItem(initialNewsItems.length > 0 ? initialNewsItems[0].id : null);
      setFeaturedPublication(initialPublications.length > 0 ? initialPublications[0].id : null);

      // Reset team image
      setTeamImage('/assets/lab_team.jpeg');
      
      // Reset team image position
      setTeamImagePosition('center');
      
      alert('Data has been reset to defaults.');
    }
  };

  const getTeamMemberById = (id: string): TeamMember | undefined => {
    return teamMembers.find(member => member.id === id);
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  const getNewsItemById = (id: string): NewsItem | undefined => {
    return newsItems.find(newsItem => newsItem.id === id);
  };

  const getCollaboratorById = (id: string): Collaborator | undefined => {
    return collaborators.find(collaborator => collaborator.id === id);
  };

  const getPublicationById = (id: string): Publication | undefined => {
    return publications.find(publication => publication.id === id);
  };

  return (
    <ContentContext.Provider value={{
      projects,
      teamMembers,
      newsItems,
      collaborators,
      publications,
      software,
      jobOpenings,
      fundingSources,
      updateProject,
      addProject,
      deleteProject,
      reorderProjects,
      reorderTeamMembers,
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
      updateJobOpening,
      addJobOpening,
      deleteJobOpening,
      updateFundingSource,
      addFundingSource,
      deleteFundingSource,
      resetToDefaults,
      getTeamMemberById,
      getProjectById,
      getNewsItemById,
      getCollaboratorById,
      getPublicationById,
      getSoftwareById,
      getJobOpeningById,
      getFundingSourceById,

      // Add the new methods
      setFeaturedProject: handleSetFeaturedProject,
      setFeaturedNewsItem: handleSetFeaturedNewsItem,
      setFeaturedPublication: handleSetFeaturedPublication,
      getFeaturedItems,
      getTeamImage,
      updateTeamImage,
      getTeamImagePosition,
      updateTeamImagePosition,
    }}>
      {children}
    </ContentContext.Provider>
  );
};
