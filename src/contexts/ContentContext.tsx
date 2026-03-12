import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Project, projects as initialProjects } from '../data/projects';
import { TeamMember, teamMembers as initialTeamMembers } from '../data/team';
import { NewsItem, newsItems as initialNewsItems } from '../data/news';
import { Collaborator, collaborators as initialCollaborators } from '../data/collaborators';
import { FundingSource, fundingSources as initialFundingSources } from '../data/funding';
import { Publication, publications as initialPublications } from '../data/publications';
import { Software, software as initialSoftware } from '../data/software';
import { JobOpening, jobOpenings as initialJobOpenings } from '../data/jobOpenings';
import { createGradient, generateTopicColor, createProjectGradient, hexToHsl, LAB_COLOR } from '../utils/colorUtils';

// Import Firestore functions
import * as db from '../firebase/db';

// Define the topic color structure
export interface TopicColor {
  name: string;
  color: string;
  hue: number;
}

// Define the Content Context type
interface ContentContextType {
  // Loading state
  loading: boolean;

  // Data arrays
  projects: Project[];
  teamMembers: TeamMember[];
  newsItems: NewsItem[];
  collaborators: Collaborator[];
  fundingSources: FundingSource[];
  publications: Publication[];
  software: Software[];
  jobOpenings: JobOpening[];
  topicColorRegistry: Record<string, TopicColor>;

  // Project operations
  updateProject: (project: Project) => void;
  addProject: (project: Project) => Project;
  deleteProject: (id: string) => void;
  reorderProjects: (projectIds: string[]) => void;
  getProjectById: (id: string) => Project | undefined;

  // Team member operations
  updateTeamMember: (teamMember: TeamMember) => void;
  addTeamMember: (teamMember: TeamMember) => TeamMember;
  deleteTeamMember: (id: string) => void;
  reorderTeamMembers: (teamMemberIds: string[]) => void;
  getTeamMemberById: (id: string) => TeamMember | undefined;

  // News item operations
  updateNewsItem: (newsItem: NewsItem) => void;
  addNewsItem: (newsItem: NewsItem) => NewsItem;
  deleteNewsItem: (id: string) => void;
  getNewsItemById: (id: string) => NewsItem | undefined;

  // Collaborator operations
  updateCollaborator: (collaborator: Collaborator) => void;
  addCollaborator: (collaborator: Collaborator) => Collaborator;
  deleteCollaborator: (id: string) => void;
  reorderCollaborators: (collaboratorIds: string[]) => void;
  getCollaboratorById: (id: string) => Collaborator | undefined;

  // Publication operations
  updatePublication: (publication: Publication) => void;
  addPublication: (publication: Publication) => Publication;
  deletePublication: (id: string) => void;
  getPublicationById: (id: string) => Publication | undefined;

  // Software operations
  updateSoftware: (software: Software) => void;
  addSoftware: (software: Software) => Software;
  deleteSoftware: (id: string) => void;
  getSoftwareById: (id: string) => Software | undefined;

  // Job opening operations
  updateJobOpening: (jobOpening: JobOpening) => void;
  addJobOpening: (jobOpening: JobOpening) => JobOpening;
  deleteJobOpening: (id: string) => void;
  getJobOpeningById: (id: string) => JobOpening | undefined;

  // Funding source operations
  updateFundingSource: (fundingSource: FundingSource) => void;
  addFundingSource: (fundingSource: FundingSource) => FundingSource;
  deleteFundingSource: (id: string) => void;
  getFundingSourceById: (id: string) => FundingSource | undefined;

  // Topic color operations
  updateTopicColor: (name: string, color: string) => void;
  addTopicColor: (name: string, color: string) => void;
  removeTopicColor: (name: string) => void;
  getTopicColorByName: (name: string) => TopicColor | undefined;

  // Global operations
  resetToDefaults: () => void;

  // Featured items operations
  setFeaturedProject: (projectId: string) => void;
  setFeaturedNewsItem: (newsItemId: string) => void;
  setFeaturedPublication: (publicationId: string) => void;
  getFeaturedItems: () => { projectId: string | null; newsItemId: string | null; publicationId: string | null };

  // Team image operations
  getTeamImage: () => string;
  updateTeamImage: (imageUrl: string) => void;
  getTeamImagePosition: () => string;
  updateTeamImagePosition: (position: string) => void;
}

// Create the context with a default value
export const ContentContext = createContext<ContentContextType>({
  loading: true,
  projects: [],
  teamMembers: [],
  newsItems: [],
  collaborators: [],
  fundingSources: [],
  publications: [],
  software: [],
  jobOpenings: [],
  topicColorRegistry: {},

  updateProject: () => {},
  addProject: () => ({ id: '', title: '', description: '', color: '', category: '', team: [] }),
  deleteProject: () => {},
  reorderProjects: () => {},
  getProjectById: () => undefined,

  updateTeamMember: () => {},
  addTeamMember: () => ({ id: '', name: '', role: '', bio: '', imageUrl: '', color: '' }),
  deleteTeamMember: () => {},
  reorderTeamMembers: () => {},
  getTeamMemberById: () => undefined,

  updateNewsItem: () => {},
  addNewsItem: () => ({ id: '', title: '', content: '', date: '', author: '' }),
  deleteNewsItem: () => {},
  getNewsItemById: () => undefined,

  updateCollaborator: () => {},
  addCollaborator: () => ({ id: '', name: '', url: '' }),
  deleteCollaborator: () => {},
  reorderCollaborators: () => {},
  getCollaboratorById: () => undefined,

  updatePublication: () => {},
  addPublication: () => ({ id: '', title: '', authors: [], journal: '', year: 0, citation: '', type: 'journal article' }),
  deletePublication: () => {},
  getPublicationById: () => undefined,

  updateSoftware: () => {},
  addSoftware: () => ({ id: '', name: '', description: '', repoUrl: '', technologies: [], developers: [], license: '' }),
  deleteSoftware: () => {},
  getSoftwareById: () => undefined,

  updateJobOpening: () => {},
  addJobOpening: () => ({ id: '', title: '', description: '', requirements: [], type: 'full-time', location: '', postedDate: '', isOpen: true }),
  deleteJobOpening: () => {},
  getJobOpeningById: () => undefined,

  updateFundingSource: () => {},
  addFundingSource: () => ({ id: '', name: '', url: '' }),
  deleteFundingSource: () => {},
  getFundingSourceById: () => undefined,

  updateTopicColor: () => {},
  addTopicColor: () => {},
  removeTopicColor: () => {},
  getTopicColorByName: () => undefined,

  resetToDefaults: () => {},

  setFeaturedProject: () => {},
  setFeaturedNewsItem: () => {},
  setFeaturedPublication: () => {},
  getFeaturedItems: () => ({ projectId: null, newsItemId: null, publicationId: null }),

  getTeamImage: () => '/assets/lab_team.jpeg',
  updateTeamImage: () => {},
  getTeamImagePosition: () => 'center',
  updateTeamImagePosition: () => {},
});

// Create a hook to use the content context
export const useContent = () => useContext(ContentContext);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [software, setSoftware] = useState<Software[]>([]);
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([]);
  const [topicColorRegistry, setTopicColorRegistry] = useState<Record<string, TopicColor>>({});

  // Add state for featured items
  const [featuredProject, setFeaturedProjectState] = useState<string | null>(null);
  const [featuredNewsItem, setFeaturedNewsItemState] = useState<string | null>(null);
  const [featuredPublication, setFeaturedPublicationState] = useState<string | null>(null);

  // Add state for team image
  const [teamImage, setTeamImageState] = useState<string>('https://i.postimg.cc/j2yg6GfL/lab-team.jpg');
  const [teamImagePosition, setTeamImagePositionState] = useState<string>('center');

  // Replace radial gradient function with linear gradient function
  const updateProjectGradients = (currentProjects: Project[]): Project[] => {
    return currentProjects.map(project => {
      const gradient = `linear-gradient(to right, #00AAFF 0%, #005580 100%)`;
      return {
        ...project,
        color: gradient
      };
    });
  };

  // Load all data from Firestore on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load all collections in parallel
        const [
          projectsData,
          teamData,
          newsData,
          collaboratorsData,
          publicationsData,
          softwareData,
          jobOpeningsData,
          fundingSourcesData,
          topicColorsData,
          featuredItemsData,
          teamImageData,
        ] = await Promise.all([
          db.getProjects(),
          db.getTeamMembers(),
          db.getNewsItems(),
          db.getCollaborators(),
          db.getPublications(),
          db.getSoftware(),
          db.getJobOpenings(),
          db.getFundingSources(),
          db.getTopicColors(),
          db.getFeaturedItems(),
          db.getTeamImage(),
        ]);

        // If Firestore is empty (first time), use initial data
        const finalProjects = projectsData.length > 0 ? projectsData : initialProjects;
        const finalTeamMembers = teamData.length > 0 ? teamData : initialTeamMembers;
        const finalNewsItems = newsData.length > 0 ? newsData : initialNewsItems;
        const finalCollaborators = collaboratorsData.length > 0 ? collaboratorsData : initialCollaborators;
        const finalPublications = publicationsData.length > 0 ? publicationsData : initialPublications;
        const finalSoftware = softwareData.length > 0 ? softwareData : initialSoftware;
        const finalJobOpenings = jobOpeningsData.length > 0 ? jobOpeningsData : initialJobOpenings;
        const finalFundingSources = fundingSourcesData.length > 0 ? fundingSourcesData : initialFundingSources;

        // Deduplicate project IDs for all team members
        const dedupedTeamMembers = finalTeamMembers.map(member => {
          if (member.projects && Array.isArray(member.projects)) {
            const uniqueProjectIds = Array.from(new Set(member.projects));
            return { ...member, projects: uniqueProjectIds };
          }
          return member;
        });

        // Update projects with lab blue gradient
        const updatedProjects = updateProjectGradients(finalProjects);

        // Set all state
        setProjects(updatedProjects);
        setTeamMembers(dedupedTeamMembers);
        setNewsItems(finalNewsItems);
        setCollaborators(finalCollaborators);
        setPublications(finalPublications);
        setSoftware(finalSoftware);
        setJobOpenings(finalJobOpenings);
        setFundingSources(finalFundingSources);
        setTopicColorRegistry(topicColorsData);

        // Set featured items
        setFeaturedProjectState(featuredItemsData.projectId || (updatedProjects.length > 0 ? updatedProjects[0].id : null));
        setFeaturedNewsItemState(featuredItemsData.newsItemId || (finalNewsItems.length > 0 ? finalNewsItems[0].id : null));
        setFeaturedPublicationState(featuredItemsData.publicationId || (finalPublications.length > 0 ? finalPublications[0].id : null));

        // Set team image
        setTeamImageState(teamImageData.imageUrl || 'https://i.postimg.cc/j2yg6GfL/lab-team.jpg');
        setTeamImagePositionState(teamImageData.position || 'center');

      } catch (error) {
        console.error("Error loading data from Firestore:", error);
        // Fallback to initial data on error
        setProjects(initialProjects);
        setTeamMembers(initialTeamMembers);
        setNewsItems(initialNewsItems);
        setCollaborators(initialCollaborators);
        setPublications(initialPublications);
        setSoftware(initialSoftware);
        setJobOpenings(initialJobOpenings);
        setFundingSources(initialFundingSources);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ==================== PROJECT OPERATIONS ====================

  const updateProject = (project: Project) => {
    const updatedProjects = projects.map(p => p.id === project.id ? project : p);
    setProjects(updatedProjects);
    db.saveProject(project).catch(err => console.error('Error updating project:', err));
  };

  const addProject = (project: Project): Project => {
    const newProject = { ...project, _lastUpdated: Date.now() };
    setProjects([...projects, newProject]);
    db.saveProject(newProject).catch(err => console.error('Error adding project:', err));
    return newProject;
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    db.deleteProject(id).catch(err => console.error('Error deleting project:', err));
  };

  const reorderProjects = (projectIds: string[]) => {
    const reorderedProjects = projectIds.map(id => projects.find(p => p.id === id)!).filter(Boolean);
    setProjects(reorderedProjects);
    // Save all projects with updated order
    reorderedProjects.forEach(project => {
      db.saveProject(project).catch(err => console.error('Error reordering projects:', err));
    });
  };

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(p => p.id === id);
  };

  // ==================== TEAM MEMBER OPERATIONS ====================

  const updateTeamMember = (teamMember: TeamMember) => {
    const updatedTeamMembers = teamMembers.map(t => t.id === teamMember.id ? teamMember : t);
    setTeamMembers(updatedTeamMembers);
    db.saveTeamMember(teamMember).catch(err => console.error('Error updating team member:', err));
  };

  const addTeamMember = (teamMember: TeamMember): TeamMember => {
    const newTeamMember = { ...teamMember, _lastUpdated: Date.now() };
    setTeamMembers([...teamMembers, newTeamMember]);
    db.saveTeamMember(newTeamMember).catch(err => console.error('Error adding team member:', err));
    return newTeamMember;
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(t => t.id !== id));
    db.deleteTeamMember(id).catch(err => console.error('Error deleting team member:', err));
  };

  const reorderTeamMembers = (teamMemberIds: string[]) => {
    const reorderedTeamMembers = teamMemberIds.map(id => teamMembers.find(t => t.id === id)!).filter(Boolean);
    setTeamMembers(reorderedTeamMembers);
    reorderedTeamMembers.forEach(member => {
      db.saveTeamMember(member).catch(err => console.error('Error reordering team members:', err));
    });
  };

  const getTeamMemberById = (id: string): TeamMember | undefined => {
    return teamMembers.find(t => t.id === id);
  };

  // ==================== NEWS ITEM OPERATIONS ====================

  const updateNewsItem = (newsItem: NewsItem) => {
    const updatedNewsItems = newsItems.map(n => n.id === newsItem.id ? newsItem : n);
    setNewsItems(updatedNewsItems);
    db.saveNewsItem(newsItem).catch(err => console.error('Error updating news item:', err));
  };

  const addNewsItem = (newsItem: NewsItem): NewsItem => {
    const newNewsItem = { ...newsItem, _lastUpdated: Date.now() };
    setNewsItems([...newsItems, newNewsItem]);
    db.saveNewsItem(newNewsItem).catch(err => console.error('Error adding news item:', err));
    return newNewsItem;
  };

  const deleteNewsItem = (id: string) => {
    setNewsItems(newsItems.filter(n => n.id !== id));
    db.deleteNewsItem(id).catch(err => console.error('Error deleting news item:', err));
  };

  const getNewsItemById = (id: string): NewsItem | undefined => {
    return newsItems.find(n => n.id === id);
  };

  // ==================== PUBLICATION OPERATIONS ====================

  const updatePublication = (publication: Publication) => {
    const updatedPublications = publications.map(p => p.id === publication.id ? publication : p);
    setPublications(updatedPublications);
    db.savePublication(publication).catch(err => console.error('Error updating publication:', err));
  };

  const addPublication = (publication: Publication): Publication => {
    const newPublication = { ...publication, _lastUpdated: Date.now() };
    setPublications([...publications, newPublication]);
    db.savePublication(newPublication).catch(err => console.error('Error adding publication:', err));
    return newPublication;
  };

  const deletePublication = (id: string) => {
    setPublications(publications.filter(p => p.id !== id));
    db.deletePublication(id).catch(err => console.error('Error deleting publication:', err));
  };

  const getPublicationById = (id: string): Publication | undefined => {
    return publications.find(p => p.id === id);
  };

  // ==================== SOFTWARE OPERATIONS ====================

  const updateSoftware = (softwareItem: Software) => {
    const updatedSoftware = software.map(s => s.id === softwareItem.id ? softwareItem : s);
    setSoftware(updatedSoftware);
    db.saveSoftware(softwareItem).catch(err => console.error('Error updating software:', err));
  };

  const addSoftware = (softwareItem: Software): Software => {
    const newSoftware = { ...softwareItem, _lastUpdated: Date.now() };
    setSoftware([...software, newSoftware]);
    db.saveSoftware(newSoftware).catch(err => console.error('Error adding software:', err));
    return newSoftware;
  };

  const deleteSoftware = (id: string) => {
    setSoftware(software.filter(s => s.id !== id));
    db.deleteSoftware(id).catch(err => console.error('Error deleting software:', err));
  };

  const getSoftwareById = (id: string): Software | undefined => {
    return software.find(s => s.id === id);
  };

  // ==================== JOB OPENING OPERATIONS ====================

  const updateJobOpening = (jobOpening: JobOpening) => {
    const updatedJobOpenings = jobOpenings.map(j => j.id === jobOpening.id ? jobOpening : j);
    setJobOpenings(updatedJobOpenings);
    db.saveJobOpening(jobOpening).catch(err => console.error('Error updating job opening:', err));
  };

  const addJobOpening = (jobOpening: JobOpening): JobOpening => {
    const newJobOpening = { ...jobOpening, _lastUpdated: Date.now() };
    setJobOpenings([...jobOpenings, newJobOpening]);
    db.saveJobOpening(newJobOpening).catch(err => console.error('Error adding job opening:', err));
    return newJobOpening;
  };

  const deleteJobOpening = (id: string) => {
    setJobOpenings(jobOpenings.filter(j => j.id !== id));
    db.deleteJobOpening(id).catch(err => console.error('Error deleting job opening:', err));
  };

  const getJobOpeningById = (id: string): JobOpening | undefined => {
    return jobOpenings.find(j => j.id === id);
  };

  // ==================== COLLABORATOR OPERATIONS ====================

  const updateCollaborator = (collaborator: Collaborator) => {
    const updatedCollaborators = collaborators.map(c => c.id === collaborator.id ? collaborator : c);
    setCollaborators(updatedCollaborators);
    db.saveCollaborator(collaborator).catch(err => console.error('Error updating collaborator:', err));
  };

  const addCollaborator = (collaborator: Collaborator): Collaborator => {
    const newCollaborator = { ...collaborator, _lastUpdated: Date.now() };
    setCollaborators([...collaborators, newCollaborator]);
    db.saveCollaborator(newCollaborator).catch(err => console.error('Error adding collaborator:', err));
    return newCollaborator;
  };

  const deleteCollaborator = (id: string) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
    db.deleteCollaborator(id).catch(err => console.error('Error deleting collaborator:', err));
  };

  const reorderCollaborators = (collaboratorIds: string[]) => {
    const reorderedCollaborators = collaboratorIds.map(id => collaborators.find(c => c.id === id)!).filter(Boolean);
    setCollaborators(reorderedCollaborators);
    reorderedCollaborators.forEach(collaborator => {
      db.saveCollaborator(collaborator).catch(err => console.error('Error reordering collaborators:', err));
    });
  };

  const getCollaboratorById = (id: string): Collaborator | undefined => {
    return collaborators.find(c => c.id === id);
  };

  // ==================== FUNDING SOURCE OPERATIONS ====================

  const updateFundingSource = (fundingSource: FundingSource) => {
    const updatedFundingSources = fundingSources.map(f => f.id === fundingSource.id ? fundingSource : f);
    setFundingSources(updatedFundingSources);
    db.saveFundingSource(fundingSource).catch(err => console.error('Error updating funding source:', err));
  };

  const addFundingSource = (fundingSource: FundingSource): FundingSource => {
    const newFundingSource = { ...fundingSource, _lastUpdated: Date.now() };
    setFundingSources([...fundingSources, newFundingSource]);
    db.saveFundingSource(newFundingSource).catch(err => console.error('Error adding funding source:', err));
    return newFundingSource;
  };

  const deleteFundingSource = (id: string) => {
    setFundingSources(fundingSources.filter(f => f.id !== id));
    db.deleteFundingSource(id).catch(err => console.error('Error deleting funding source:', err));
  };

  const getFundingSourceById = (id: string): FundingSource | undefined => {
    return fundingSources.find(f => f.id === id);
  };

  // ==================== TOPIC COLOR OPERATIONS ====================

  const updateTopicColor = (name: string, color: string) => {
    const existingTopic = topicColorRegistry[name];
    const hue = existingTopic ? existingTopic.hue : hexToHsl(color)[0];
    const updatedRegistry = {
      ...topicColorRegistry,
      [name]: { name, color, hue }
    };
    setTopicColorRegistry(updatedRegistry);
    db.saveTopicColors(updatedRegistry).catch(err => console.error('Error updating topic color:', err));
  };

  const addTopicColor = (name: string, color: string) => {
    const hue = hexToHsl(color)[0];
    const updatedRegistry = {
      ...topicColorRegistry,
      [name]: { name, color, hue }
    };
    setTopicColorRegistry(updatedRegistry);
    db.saveTopicColors(updatedRegistry).catch(err => console.error('Error adding topic color:', err));
  };

  const removeTopicColor = (name: string) => {
    const updatedRegistry = { ...topicColorRegistry };
    delete updatedRegistry[name];
    setTopicColorRegistry(updatedRegistry);
    db.saveTopicColors(updatedRegistry).catch(err => console.error('Error removing topic color:', err));
  };

  const getTopicColorByName = (name: string): TopicColor | undefined => {
    return topicColorRegistry[name];
  };

  // ==================== FEATURED ITEMS OPERATIONS ====================

  const setFeaturedProject = (projectId: string) => {
    setFeaturedProjectState(projectId);
    const featuredItems = {
      projectId,
      newsItemId: featuredNewsItem,
      publicationId: featuredPublication,
    };
    db.saveFeaturedItems(featuredItems).catch(err => console.error('Error setting featured project:', err));
  };

  const setFeaturedNewsItem = (newsItemId: string) => {
    setFeaturedNewsItemState(newsItemId);
    const featuredItems = {
      projectId: featuredProject,
      newsItemId,
      publicationId: featuredPublication,
    };
    db.saveFeaturedItems(featuredItems).catch(err => console.error('Error setting featured news item:', err));
  };

  const setFeaturedPublication = (publicationId: string) => {
    setFeaturedPublicationState(publicationId);
    const featuredItems = {
      projectId: featuredProject,
      newsItemId: featuredNewsItem,
      publicationId,
    };
    db.saveFeaturedItems(featuredItems).catch(err => console.error('Error setting featured publication:', err));
  };

  const getFeaturedItems = () => {
    return {
      projectId: featuredProject,
      newsItemId: featuredNewsItem,
      publicationId: featuredPublication,
    };
  };

  // ==================== TEAM IMAGE OPERATIONS ====================

  const getTeamImage = (): string => {
    return teamImage;
  };

  const updateTeamImage = (imageUrl: string): void => {
    setTeamImageState(imageUrl);
    db.saveTeamImage({ imageUrl, position: teamImagePosition }).catch(err => console.error('Error updating team image:', err));
  };

  const getTeamImagePosition = (): string => {
    return teamImagePosition;
  };

  const updateTeamImagePosition = (position: string): void => {
    setTeamImagePositionState(position);
    db.saveTeamImage({ imageUrl: teamImage, position }).catch(err => console.error('Error updating team image position:', err));
  };

  // ==================== RESET TO DEFAULTS ====================

  const resetToDefaults = () => {
    setProjects(initialProjects);
    setTeamMembers(initialTeamMembers);
    setNewsItems(initialNewsItems);
    setCollaborators(initialCollaborators);
    setPublications(initialPublications);
    setSoftware(initialSoftware);
    setJobOpenings(initialJobOpenings);
    setFundingSources(initialFundingSources);
    setTopicColorRegistry({});

    // Save all initial data to Firestore
    initialProjects.forEach(project => db.saveProject(project));
    initialTeamMembers.forEach(member => db.saveTeamMember(member));
    initialNewsItems.forEach(item => db.saveNewsItem(item));
    initialCollaborators.forEach(collab => db.saveCollaborator(collab));
    initialPublications.forEach(pub => db.savePublication(pub));
    initialSoftware.forEach(sw => db.saveSoftware(sw));
    initialJobOpenings.forEach(job => db.saveJobOpening(job));
    initialFundingSources.forEach(fund => db.saveFundingSource(fund));
  };

  // Return context value
  const contextValue: ContentContextType = {
    loading,
    projects,
    teamMembers,
    newsItems,
    collaborators,
    fundingSources,
    publications,
    software,
    jobOpenings,
    topicColorRegistry,
    updateProject,
    addProject,
    deleteProject,
    reorderProjects,
    getProjectById,
    updateTeamMember,
    addTeamMember,
    deleteTeamMember,
    reorderTeamMembers,
    getTeamMemberById,
    updateNewsItem,
    addNewsItem,
    deleteNewsItem,
    getNewsItemById,
    updateCollaborator,
    addCollaborator,
    deleteCollaborator,
    reorderCollaborators,
    getCollaboratorById,
    updatePublication,
    addPublication,
    deletePublication,
    getPublicationById,
    updateSoftware,
    addSoftware,
    deleteSoftware,
    getSoftwareById,
    updateJobOpening,
    addJobOpening,
    deleteJobOpening,
    getJobOpeningById,
    updateFundingSource,
    addFundingSource,
    deleteFundingSource,
    getFundingSourceById,
    updateTopicColor,
    addTopicColor,
    removeTopicColor,
    getTopicColorByName,
    resetToDefaults,
    setFeaturedProject,
    setFeaturedNewsItem,
    setFeaturedPublication,
    getFeaturedItems,
    getTeamImage,
    updateTeamImage,
    getTeamImagePosition,
    updateTeamImagePosition,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
};
