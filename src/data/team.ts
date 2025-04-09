// src/data/team.ts

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    color: string;
    projects?: string[];
    email?: string;
    publications?: string[];
    github?: string;
    cvUrl?: string;
}

export const teamMembers = [
  {
    "id": "sarah-johnson",
    "name": "Sebastian Musslick",
    "role": "Principal Investigator",
    "bio": "Sebastian is an Assistant Professor of Computational Neuroscience at Osnabrück University and Visiting Faculty at the Department for Cognitive and Psychological Sciences at Brown University. He is leading the Laboratory for Automated Scientific Discovery of Mind and Brain at the Institute of Cognitive Science at Osnabrück University.\n\nBefore coming back to Germany, Sebastian completed his PhD in Quantitative and Computational Neuroscience at Princeton University. Following his PhD, Sebastian joined Brown University as Assistant Research Professor and Schmidt Science Fellow, where he founded the Autonomous Empirical Research Group.",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "cognitive-ai"
    ]
  },
  {
    "id": "michael-chen",
    "name": "Sedighe Raeisi",
    "role": "Postdoc Researcher",
    "bio": "Dr. Chen focuses on brain-computer interfaces and has extensive experience in signal processing and neural engineering.",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "memory-enhancement"
    ]
  },
  {
    "id": "robert-smith",
    "name": "Daniel Weinhardt",
    "role": "PhD Researcher",
    "bio": "Dr. Smith works on cognitive modeling and AI, bridging the gap between artificial intelligence and human cognition.",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "neural-mapping"
    ],
    "publications": [
      "pub-003"
    ]
  },
  {
    "id": "emily-wong",
    "name": "Alessandra Brondetta",
    "role": "PhD Researcher",
    "bio": "Dr. Wong specializes in analyzing complex neural data patterns and developing algorithms for brain-computer interfaces.",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "cognitive-ai",
      "memory-enhancement"
    ]
  },
  {
    "id": "david-patel",
    "name": "Moritz Hartstang",
    "role": "PhD Researcher",
    "bio": "Dr. Patel studies human memory and consciousness, with particular interest in enhancement techniques and theoretical models.",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "consciousness-study",
      "project-1741685438335"
    ],
    "email": "moritz.hartstang@hfg-gmuend.de",
    "github": "morilori"
  },
  {
    "id": "member-1741684620075",
    "name": "Pelin Kömürlüoğlu",
    "role": "Master Student",
    "bio": "a",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "project-1741440790106"
    ]
  },
  {
    "id": "member-1741684567423",
    "name": "Muhip Tezcan",
    "role": "Master Student",
    "bio": "a",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "neural-mapping",
      "project-1741685533429"
    ]
  },
  {
    "id": "member-1741440725238",
    "name": "Se Eun Choi",
    "role": "Master Student",
    "bio": "a",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "neural-mapping"
    ]
  },
  {
    "id": "member-1741684793619",
    "name": "Leon Schmid",
    "role": "Master Student",
    "bio": "a",
    "imageUrl": "",
    "color": "#00AAFF",
    "projects": [
      "project-1741685533429"
    ]
  }
];
