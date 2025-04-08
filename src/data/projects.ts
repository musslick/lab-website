import { LAB_COLOR } from '../utils/colorUtils';

// Define the Project interface to match the dashboard data structure
export interface Project {
  id: string;
  title: string;
  description: string;
  color: string;
  category: string | string[]; // Supports both single string and array
  team: string[];
  topics?: string[];
  topicsWithColors?: { name: string; color: string; hue: number }[]; // Re-add topicsWithColors
  publications?: string[];
  image?: string;
  status?: 'ongoing' | 'completed';
  startDate?: string;
  endDate?: string;
  _lastUpdated?: number;
}

// Define project data with the structure matching the dashboard
export const projects: Project[] = [
    {
      "id": "cognitive-ai",
      "title": "Data-Driven Model Discovery Algorithm",
      "description": "Developing artificial intelligence models that mimic human cognitive processes for better understanding of brain function.",
      "category": [
        "Other",
        "Yes"
      ],
      "team": [
        "Daniel Weinhardt",
        "Alessandra Brondetta",
        "Sebastian Musslick"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [
        "White",
        "Red",
        "blue"
      ],
      "topicsWithColors": [
        {
          "name": "White",
          "color": "#99fffa",
          "hue": 177
        },
        {
          "name": "Red",
          "color": "#ff999b",
          "hue": 359
        },
        {
          "name": "blue",
          "color": "#ac99ff",
          "hue": 251
        }
      ],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1744141152248
    },
    {
      "id": "neural-mapping",
      "title": "Automated Discovery of Sequential Sampling Models",
      "description": "Mapping the complex interconnections in neural networks through advanced imaging techniques and computational models.",
      "category": "Yes",
      "team": [
        "Daniel Weinhardt",
        "Muhip Tezcan",
        "Sebastian Musslick",
        "Se Eun Choi"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [
        "White",
        "Yellow"
      ],
      "topicsWithColors": [
        {
          "name": "White",
          "color": "#99fffa",
          "hue": 177
        },
        {
          "name": "Yellow",
          "color": "#fff899",
          "hue": 56
        }
      ],
      "status": "ongoing",
      "publications": [
        "pub-003",
        "pub-001"
      ],
      "_lastUpdated": 1743367023235
    },
    {
      "id": "brain-computer",
      "title": "Closed-Loop RL-SINDy",
      "description": "Creating seamless interfaces between brain activity and computers for assistive technology and research applications.",
      "category": "Other",
      "team": [
        "Sedighe Raeisi",
        "Daniel Weinhardt",
        "Se Eun Choi"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [],
      "topicsWithColors": [],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1743109441881
    },
    {
      "id": "consciousness-study",
      "title": "Understany",
      "description": "Exploring the neural correlates of consciousness through multidisciplinary approaches and advanced neuroimaging.",
      "category": "Other",
      "team": [
        "Moritz Hartstang"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [
        "Wuhu"
      ],
      "topicsWithColors": [
        {
          "name": "Wuhu",
          "color": "#ff9999",
          "hue": 0
        }
      ],
      "status": "ongoing",
      "publications": [
        "pub-001"
      ],
      "_lastUpdated": 1743624419847
    },
    {
      "id": "project-1741440790106",
      "title": "Landscaping",
      "description": "a",
      "category": "Other",
      "team": [
        "Pelin Kömürlüoğlu"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [],
      "topicsWithColors": [],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1743109403964
    },
    {
      "id": "project-1741685324148",
      "title": "Hierarchical Bayesian Model",
      "description": "a",
      "category": "Other",
      "team": [
        "Sedighe Raeisi",
        "Se Eun Choi"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [],
      "topicsWithColors": [],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1743109417680
    },
    {
      "id": "project-1741685438335",
      "title": "Closed-Loop Integrative Discovery",
      "description": "a",
      "category": "Other",
      "team": [
        "Sebastian Musslick",
        "Sedighe Raeisi",
        "Daniel Weinhardt",
        "Moritz Hartstang",
        "Se Eun Choi",
        "Pelin Kömürlüoğlu"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [],
      "topicsWithColors": [],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1743109376599
    },
    {
      "id": "memory-enhancement",
      "title": "LLM Simulator for Fostering Belief Flexibility",
      "description": "Investigating techniques to enhance memory formation and recall through targeted stimulation of neural pathways.",
      "category": "Other",
      "team": [
        "Alessandra Brondetta",
        "Sedighe Raeisi",
        "Moritz Hartstang"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [],
      "topicsWithColors": [],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1741813020845
    },
    {
      "id": "project-1741685533429",
      "title": "Synthetic Participant",
      "description": "a",
      "category": "Other",
      "team": [
        "Alessandra Brondetta",
        "Muhip Tezcan",
        "Leon Schmid"
      ],
      "color": "radial-gradient(circle at center, #00AAFF 0%, #005580 100%)",
      "topics": [],
      "topicsWithColors": [],
      "status": "ongoing",
      "publications": [],
      "_lastUpdated": 1741813094821
    }
  ];