import { teamMembers } from './team';
import { createGradient } from '../utils/colorUtils';

// Export the Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  color: string;
  category: string;
  team: string[];
  publications?: string[];
  image?: string;
  status?: 'ongoing' | 'completed';
  startDate?: string;
  endDate?: string;
}

// Helper function to get team member colors
const getTeamMemberColors = (teamNames: string[]): string[] => {
    return teamNames.map(name => {
        const member = teamMembers.find(m => m.name === name);
        return member ? member.color : '#CCCCCC'; // Default gray if member not found
    });
};

// Create projects with team colors and lab blue
const createProjectsWithTeamColors = (): Project[] => {
    // Define project data with the correct status type
    const projectData: Omit<Project, 'color'>[] = [
        {
            id: "neural-mapping",
            title: "Neural Network Mapping",
            description: "Mapping the complex interconnections in neural networks through advanced imaging techniques and computational models.",
            category: "Neuroscience",
            team: ["Sarah Johnson", "Michael Chen"],
            publications: [
              "Johnson, S. et al. (2022). Advanced techniques in neural mapping. Journal of Neuroscience, 45(3), 112-128.",
              "Chen, M. & Johnson, S. (2021). Computational approaches to neural network visualization. Brain Research, 33(2), 45-67."
            ],
            status: "ongoing" as const,
            startDate: "2022-06-01"
        },
        {
            id: "cognitive-ai",
            title: "Cognitive AI Models",
            description: "Developing artificial intelligence models that mimic human cognitive processes for better understanding of brain function.",
            category: "Artificial Intelligence",
            team: ["Robert Smith", "Emily Wong"],
            publications: [
              "Smith, R. & Wong, E. (2023). Cognitive frameworks in machine learning. AI Journal, 12(4), 89-105."
            ],
            status: "ongoing" as const,
            startDate: "2022-01-10"
        },
        {
            id: "memory-enhancement",
            title: "Memory Enhancement Research",
            description: "Investigating techniques to enhance memory formation and recall through targeted stimulation of neural pathways.",
            category: "Cognitive Enhancement",
            team: ["David Patel", "Sarah Johnson"],
            publications: [],
            status: "ongoing" as const,
            startDate: "2021-03-15"
        },
        {
            id: "brain-computer",
            title: "Brain-Computer Interfaces",
            description: "Creating seamless interfaces between brain activity and computers for assistive technology and research applications.",
            category: "Interface Technology",
            team: ["Michael Chen", "Emily Wong"],
            publications: [
              "Chen, M. et al. (2022). Non-invasive BCI advancements. Tech & Brain Journal, 8(2), 34-49."
            ],
            status: "ongoing" as const,
            startDate: "2021-03-15"
        },
        {
            id: "consciousness-study",
            title: "Consciousness Studies",
            description: "Exploring the neural correlates of consciousness through multidisciplinary approaches and advanced neuroimaging.",
            category: "Neuroscience",
            team: ["Robert Smith", "David Patel"],
            publications: [],
            status: "ongoing" as const,
            startDate: "2022-01-10"
        }
    ];

    // Generate color gradients for projects that blend team colors with lab blue
    return projectData.map(project => {
        const teamColors = getTeamMemberColors(project.team);
        
        return {
            ...project,
            color: createGradient(teamColors, {
                includeHighlight: true,          // Include lab blue color
                highlightColor: '#00AAFF',       // Lab blue
                mixColors: true,                 // Mix team colors with lab blue
                mixRatio: 0.3,                   // 30% blend with lab blue
                type: 'radial',                  // Use radial gradients
                position: 'circle at center'     // Center position
            })
        };
    });
};

export const projects = createProjectsWithTeamColors();