export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  url?: string;
  abstract?: string;
  keywords?: string[];
  type: 'journal' | 'conference' | 'book' | 'preprint' | 'thesis';
  citation: string;
  projectId?: string;
}

export const publications: Publication[] = [
  {
    "id": "pub-001",
    "title": "Advance",
    "journal": "Journal of Neuroscience",
    "year": 2022,
    "type": "journal",
    "authors": [
      "Musslick, S.",
      "Raeisi, S.",
      "Hartstang, M.",
      "Brondetta, A."
    ],
    "citation": "Johnson, S., Chen, M., & Smith, R. (2022). Advanced techniques in neural mapping. Journal of Neuroscience, 45(3), 112-128.",
    "doi": "10.1000/xyz123",
    "url": "https://doi.org/10.1000/xyz123",
    "abstract": "This paper presents novel approaches to mapping neural networks using advanced imaging techniques combined with computational models. The results demonstrate improved accuracy in identifying network interconnections.",
    "projectId": "consciousness-study",
    "keywords": [
      "Neural Networks",
      "Brain Imaging",
      "Test"
    ]
  },
  {
    "id": "pub-002",
    "title": "Computational approaches to neural network visualization",
    "authors": [
      "Chen, M.",
      "Johnson, S."
    ],
    "journal": "Brain Research",
    "year": 2021,
    "doi": "10.1000/abc456",
    "url": "https://doi.org/10.1000/abc456",
    "abstract": "This research explores new computational methods for visualizing complex neural networks. We present algorithms that improve the interpretability of neural structures and their functional relationships.",
    "keywords": [
      "Neural Networks",
      "Visualization",
      "Algorithms"
    ],
    "type": "journal",
    "citation": "Chen, M. & Johnson, S. (2021). Computational approaches to neural network visualization. Brain Research, 33(2), 45-67.",
    "projectId": "neural-mapping"
  },
  {
    "id": "pub-003",
    "title": "Wow ",
    "journal": "AI Journal",
    "year": 2023,
    "type": "journal",
    "authors": [
      "Hartstang, M.",
      "Weinhardt, D."
    ],
    "citation": "Smith, R. & Wong, E. (2023). Cognitive frameworks in machine learning. AI Journal, 12(4), 89-105.",
    "doi": "10.1000/def789",
    "url": "https://doi.org/10.1000/def789",
    "abstract": "This paper introduces cognitive frameworks for improving machine learning models. By incorporating principles from human cognition, we demonstrate enhanced model performance across multiple tasks.",
    "projectId": "consciousness-study",
    "keywords": [
      "Artificial Intelligence",
      "Cognitive Science",
      "Machine Learning"
    ]
  },
  {
    "id": "pub-004",
    "title": "Non-invasive BCI advancements",
    "journal": "Tech & Brain Journal",
    "year": 2022,
    "type": "journal",
    "authors": [
      "Musslick, S.",
      "Raeisi, S."
    ],
    "citation": "Chen, M., Patel, D., & Wong, E. (2022). Non-invasive BCI advancements. Tech & Brain Journal, 8(2), 34-49.",
    "doi": "10.1000/ghi101",
    "url": "https://doi.org/10.1000/ghi101",
    "abstract": "This study presents recent advancements in non-invasive brain-computer interfaces. We demonstrate improved signal acquisition and processing techniques that enhance the accuracy and usability of BCI systems.",
    "projectId": "brain-computer",
    "keywords": [
      "BCI",
      "Assistive Technology",
      "Signal Processing"
    ]
  },
  {
    "id": "pub-005",
    "title": "Neuroplasticity mechanisms in memory formation",
    "authors": [
      "Patel, D.",
      "Johnson, S."
    ],
    "journal": "Neurobiology Review",
    "year": 2021,
    "doi": "10.1000/jkl202",
    "url": "https://doi.org/10.1000/jkl202",
    "abstract": "This review examines the neuroplastic mechanisms underlying memory formation and retrieval. We synthesize recent findings and present a unified model of memory processes across different brain regions.",
    "keywords": [
      "Memory",
      "Neuroplasticity",
      "Brain Stimulation"
    ],
    "type": "journal",
    "citation": "Patel, D. & Johnson, S. (2021). Neuroplasticity mechanisms in memory formation. Neurobiology Review, 27(1), 78-95.",
    "projectId": "memory-enhancement"
  }
];
