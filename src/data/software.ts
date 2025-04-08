export interface Software {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  repoUrl: string;
  demoUrl?: string;
  documentationUrl?: string;
  technologies: string[];
  developers: string[];
  license: string;
  projectId?: string;
  featured?: boolean;
  releaseDate?: string;
  lastUpdate?: string;
}

export const software: Software[] = [
  {
    "id": "brain-mapper",
    "name": "Mapper",
    "description": "An open-source tool for visualizing complex neural networks and brain connectivity patterns. BrainMapper provides researchers with intuitive interfaces to analyze large-scale neuroimaging data.",
    "repoUrl": "https://github.com/automated-lab/brain-mapper",
    "technologies": [
      "Python",
      "TensorFlow",
      "D3.js",
      "WebGL"
    ],
    "developers": [
      "Sebastian Musslick"
    ],
    "license": "MIT",
    "documentationUrl": "https://brain-mapper.docs.automated-lab.org",
    "projectId": "consciousness-study",
    "featured": true,
    "releaseDate": "2022-05-15",
    "lastUpdate": "2023-08-01"
  },
  {
    "id": "cogni-sim",
    "name": "CogniSi",
    "description": "A cognitive architecture simulator that allows researchers to model and test theories of cognitive processing. CogniSim bridges the gap between artificial intelligence models and theories of human cognition.",
    "repoUrl": "https://github.com/automated-lab/cogni-sim",
    "technologies": [
      "JavaScript",
      "React",
      "Python",
      "PyTorch"
    ],
    "developers": [
      "Robert Smith",
      "Emily Wong"
    ],
    "license": "Apache 2.0",
    "imageUrl": "/assets/software/cognisim.png",
    "demoUrl": "https://demos.automated-lab.org/cognisim",
    "projectId": "cognitive-ai",
    "releaseDate": "2022-11-03"
  },
  {
    "id": "neuro-bci",
    "name": "NeuroBCI",
    "description": "A signal processing library specialized for brain-computer interfaces. NeuroBCI offers robust algorithms for filtering, feature extraction, and classification of neural signals in real-time applications.",
    "repoUrl": "https://github.com/automated-lab/neuro-bci",
    "technologies": [
      "C++",
      "Python",
      "CUDA"
    ],
    "developers": [
      "Michael Chen",
      "Emily Wong"
    ],
    "license": "GPL v3",
    "projectId": "brain-computer",
    "lastUpdate": "2023-06-30"
  }
];
