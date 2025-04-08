import { LAB_COLOR } from '../utils/colorUtils';

// Update the Project interface to include topicsWithColors with hue instead of lightness
export interface Project {
  id: string;
  title: string;
  description: string;
  color: string;
  category: string | string[]; // Disciplines (can be single string or array)
  team: string[];
  topics?: string[]; // Methods
  topicsWithColors?: { name: string; color: string; hue: number }[]; // Methods with colors
  publications?: string[];
  image?: string;
  status?: 'ongoing' | 'completed';
  startDate?: string;
  endDate?: string;
  _lastUpdated?: number; // Added for cache busting
}

// Define project data with the correct status type and add methods
export const projects: Project[] = [
    {
        id: "neural-mapping",
        title: "Neural Network Mapping",
        description: "Mapping the complex interconnections in neural networks through advanced imaging techniques and computational models.",
        category: "Brain Research", // Discipline
        team: ["Sarah Johnson", "Michael Chen"],
        topics: ["Neural Networks", "Brain Imaging", "Computational Modeling"], // Methods
        publications: [
          "Johnson, S. et al. (2022). Advanced techniques in neural mapping. Journal of Neuroscience, 45(3), 112-128.",
          "Chen, M. & Johnson, S. (2021). Computational approaches to neural network visualization. Brain Research, 33(2), 45-67."
        ],
        status: "ongoing",
        startDate: "2022-06-01",
        color: LAB_COLOR
    },
    {
        id: "cognitive-ai",
        title: "Cognitive AI Models",
        description: "Developing artificial intelligence models that mimic human cognitive processes for better understanding of brain function.",
        category: "Artificial Intelligence", // Discipline
        team: ["Robert Smith", "Emily Wong"],
        topics: ["Artificial Intelligence", "Cognitive Science", "Machine Learning"], // Methods
        publications: [
          "Smith, R. & Wong, E. (2023). Cognitive frameworks in machine learning. AI Journal, 12(4), 89-105."
        ],
        status: "ongoing",
        startDate: "2022-01-10",
        color: LAB_COLOR
    },
    {
        id: "memory-enhancement",
        title: "Memory Enhancement Research",
        description: "Investigating techniques to enhance memory formation and recall through targeted stimulation of neural pathways.",
        category: "Cognitive Enhancement", // Discipline
        team: ["David Patel", "Sarah Johnson"],
        topics: ["Memory", "Neuroplasticity", "Brain Stimulation"], // Methods
        publications: [],
        status: "ongoing",
        startDate: "2021-03-15",
        color: LAB_COLOR
    },
    {
        id: "brain-computer",
        title: "Brain-Computer Interfaces",
        description: "Creating seamless interfaces between brain activity and computers for assistive technology and research applications.",
        category: "Interface Technology", // Discipline
        team: ["Michael Chen", "Emily Wong"],
        topics: ["BCI", "Assistive Technology", "Signal Processing"], // Methods
        publications: [
          "Chen, M. et al. (2022). Non-invasive BCI advancements. Tech & Brain Journal, 8(2), 34-49."
        ],
        status: "ongoing",
        startDate: "2021-03-15",
        color: LAB_COLOR
    },
    {
        id: "consciousness-study",
        title: "Consciousness Studies",
        description: "Exploring the neural correlates of consciousness through multidisciplinary approaches and advanced neuroimaging.",
        category: "Neuroscience", // Discipline
        team: ["Robert Smith", "David Patel"],
        topics: ["Consciousness", "Neuroscience", "Neuroimaging"], // Methods
        publications: [],
        status: "ongoing",
        startDate: "2022-01-10",
        color: LAB_COLOR
    }
];