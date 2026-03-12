// Firestore Database Operations
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import {
  Project,
  TeamMember,
  NewsItem,
  Collaborator,
  FundingSource,
  Publication,
  Software,
  JobOpening,
} from '../types';
import { TopicColor } from '../contexts/ContentContext';

// Collection names
const COLLECTIONS = {
  PROJECTS: 'projects',
  TEAM_MEMBERS: 'teamMembers',
  NEWS_ITEMS: 'newsItems',
  COLLABORATORS: 'collaborators',
  FUNDING_SOURCES: 'fundingSources',
  PUBLICATIONS: 'publications',
  SOFTWARE: 'software',
  JOB_OPENINGS: 'jobOpenings',
  TOPIC_COLORS: 'topicColors',
  SETTINGS: 'settings',
};

// Helper function to handle Firestore timestamps
const convertTimestamps = (data: any): any => {
  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }
  if (Array.isArray(data)) {
    return data.map(convertTimestamps);
  }
  if (data && typeof data === 'object') {
    const converted: any = {};
    for (const key in data) {
      converted[key] = convertTimestamps(data[key]);
    }
    return converted;
  }
  return data;
};

// ==================== PROJECTS ====================

export const getProjects = async (): Promise<Project[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.PROJECTS));
    const projects = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as Project[];
    return projects;
  } catch (error) {
    console.error('Error getting projects:', error);
    throw error;
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.PROJECTS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as Project;
    }
    return null;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
};

export const saveProject = async (project: Project): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PROJECTS, project.id);
    await setDoc(docRef, project);
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PROJECTS, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// ==================== TEAM MEMBERS ====================

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.TEAM_MEMBERS));
    const teamMembers = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as TeamMember[];
    return teamMembers;
  } catch (error) {
    console.error('Error getting team members:', error);
    throw error;
  }
};

export const getTeamMemberById = async (id: string): Promise<TeamMember | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.TEAM_MEMBERS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as TeamMember;
    }
    return null;
  } catch (error) {
    console.error('Error getting team member:', error);
    throw error;
  }
};

export const saveTeamMember = async (teamMember: TeamMember): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.TEAM_MEMBERS, teamMember.id);
    await setDoc(docRef, teamMember);
  } catch (error) {
    console.error('Error saving team member:', error);
    throw error;
  }
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.TEAM_MEMBERS, id));
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
};

// ==================== NEWS ITEMS ====================

export const getNewsItems = async (): Promise<NewsItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.NEWS_ITEMS));
    const newsItems = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as NewsItem[];
    return newsItems;
  } catch (error) {
    console.error('Error getting news items:', error);
    throw error;
  }
};

export const getNewsItemById = async (id: string): Promise<NewsItem | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.NEWS_ITEMS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as NewsItem;
    }
    return null;
  } catch (error) {
    console.error('Error getting news item:', error);
    throw error;
  }
};

export const saveNewsItem = async (newsItem: NewsItem): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.NEWS_ITEMS, newsItem.id);
    await setDoc(docRef, newsItem);
  } catch (error) {
    console.error('Error saving news item:', error);
    throw error;
  }
};

export const deleteNewsItem = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.NEWS_ITEMS, id));
  } catch (error) {
    console.error('Error deleting news item:', error);
    throw error;
  }
};

// ==================== PUBLICATIONS ====================

export const getPublications = async (): Promise<Publication[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.PUBLICATIONS));
    const publications = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as Publication[];
    return publications;
  } catch (error) {
    console.error('Error getting publications:', error);
    throw error;
  }
};

export const getPublicationById = async (id: string): Promise<Publication | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.PUBLICATIONS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as Publication;
    }
    return null;
  } catch (error) {
    console.error('Error getting publication:', error);
    throw error;
  }
};

export const savePublication = async (publication: Publication): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PUBLICATIONS, publication.id);
    await setDoc(docRef, publication);
  } catch (error) {
    console.error('Error saving publication:', error);
    throw error;
  }
};

export const deletePublication = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PUBLICATIONS, id));
  } catch (error) {
    console.error('Error deleting publication:', error);
    throw error;
  }
};

// ==================== SOFTWARE ====================

export const getSoftware = async (): Promise<Software[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.SOFTWARE));
    const software = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as Software[];
    return software;
  } catch (error) {
    console.error('Error getting software:', error);
    throw error;
  }
};

export const getSoftwareById = async (id: string): Promise<Software | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.SOFTWARE, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as Software;
    }
    return null;
  } catch (error) {
    console.error('Error getting software:', error);
    throw error;
  }
};

export const saveSoftware = async (software: Software): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.SOFTWARE, software.id);
    await setDoc(docRef, software);
  } catch (error) {
    console.error('Error saving software:', error);
    throw error;
  }
};

export const deleteSoftware = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.SOFTWARE, id));
  } catch (error) {
    console.error('Error deleting software:', error);
    throw error;
  }
};

// ==================== JOB OPENINGS ====================

export const getJobOpenings = async (): Promise<JobOpening[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.JOB_OPENINGS));
    const jobOpenings = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as JobOpening[];
    return jobOpenings;
  } catch (error) {
    console.error('Error getting job openings:', error);
    throw error;
  }
};

export const getJobOpeningById = async (id: string): Promise<JobOpening | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.JOB_OPENINGS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as JobOpening;
    }
    return null;
  } catch (error) {
    console.error('Error getting job opening:', error);
    throw error;
  }
};

export const saveJobOpening = async (jobOpening: JobOpening): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.JOB_OPENINGS, jobOpening.id);
    await setDoc(docRef, jobOpening);
  } catch (error) {
    console.error('Error saving job opening:', error);
    throw error;
  }
};

export const deleteJobOpening = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.JOB_OPENINGS, id));
  } catch (error) {
    console.error('Error deleting job opening:', error);
    throw error;
  }
};

// ==================== COLLABORATORS ====================

export const getCollaborators = async (): Promise<Collaborator[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.COLLABORATORS));
    const collaborators = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as Collaborator[];
    return collaborators;
  } catch (error) {
    console.error('Error getting collaborators:', error);
    throw error;
  }
};

export const getCollaboratorById = async (id: string): Promise<Collaborator | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.COLLABORATORS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as Collaborator;
    }
    return null;
  } catch (error) {
    console.error('Error getting collaborator:', error);
    throw error;
  }
};

export const saveCollaborator = async (collaborator: Collaborator): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.COLLABORATORS, collaborator.id);
    await setDoc(docRef, collaborator);
  } catch (error) {
    console.error('Error saving collaborator:', error);
    throw error;
  }
};

export const deleteCollaborator = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.COLLABORATORS, id));
  } catch (error) {
    console.error('Error deleting collaborator:', error);
    throw error;
  }
};

// ==================== FUNDING SOURCES ====================

export const getFundingSources = async (): Promise<FundingSource[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.FUNDING_SOURCES));
    const fundingSources = querySnapshot.docs.map((doc) => ({
      ...convertTimestamps(doc.data()),
      id: doc.id,
    })) as FundingSource[];
    return fundingSources;
  } catch (error) {
    console.error('Error getting funding sources:', error);
    throw error;
  }
};

export const getFundingSourceById = async (id: string): Promise<FundingSource | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.FUNDING_SOURCES, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...convertTimestamps(docSnap.data()), id: docSnap.id } as FundingSource;
    }
    return null;
  } catch (error) {
    console.error('Error getting funding source:', error);
    throw error;
  }
};

export const saveFundingSource = async (fundingSource: FundingSource): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.FUNDING_SOURCES, fundingSource.id);
    await setDoc(docRef, fundingSource);
  } catch (error) {
    console.error('Error saving funding source:', error);
    throw error;
  }
};

export const deleteFundingSource = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.FUNDING_SOURCES, id));
  } catch (error) {
    console.error('Error deleting funding source:', error);
    throw error;
  }
};

// ==================== TOPIC COLORS ====================

export const getTopicColors = async (): Promise<Record<string, TopicColor>> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'topicColors');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return convertTimestamps(docSnap.data().registry || {});
    }
    return {};
  } catch (error) {
    console.error('Error getting topic colors:', error);
    throw error;
  }
};

export const saveTopicColors = async (registry: Record<string, TopicColor>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'topicColors');
    await setDoc(docRef, { registry });
  } catch (error) {
    console.error('Error saving topic colors:', error);
    throw error;
  }
};

// ==================== FEATURED ITEMS ====================

export interface FeaturedItems {
  projectId: string | null;
  newsItemId: string | null;
  publicationId: string | null;
}

export const getFeaturedItems = async (): Promise<FeaturedItems> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'featuredItems');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return convertTimestamps(docSnap.data()) as FeaturedItems;
    }
    return { projectId: null, newsItemId: null, publicationId: null };
  } catch (error) {
    console.error('Error getting featured items:', error);
    throw error;
  }
};

export const saveFeaturedItems = async (featuredItems: FeaturedItems): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'featuredItems');
    await setDoc(docRef, featuredItems);
  } catch (error) {
    console.error('Error saving featured items:', error);
    throw error;
  }
};

// ==================== TEAM IMAGE ====================

export interface TeamImageSettings {
  imageUrl: string;
  position: string;
}

export const getTeamImage = async (): Promise<TeamImageSettings> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'teamImage');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return convertTimestamps(docSnap.data()) as TeamImageSettings;
    }
    return { imageUrl: '', position: 'center center' };
  } catch (error) {
    console.error('Error getting team image:', error);
    throw error;
  }
};

export const saveTeamImage = async (settings: TeamImageSettings): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.SETTINGS, 'teamImage');
    await setDoc(docRef, settings);
  } catch (error) {
    console.error('Error saving team image:', error);
    throw error;
  }
};
