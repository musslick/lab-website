export interface JobOpening {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'internship' | 'phd' | 'postdoc';
  location: string;
  contactEmail?: string;
  applicationUrl?: string;
  postedDate: string;
  closingDate?: string;
  projectId?: string;
  isOpen: boolean;
}

export const jobOpenings: JobOpening[] = [
  {
    "id": "job-001",
    "title": "Postdoctoral Researcher in Mapping",
    "description": "We're seeking a motivated postdoctoral researcher to join our Neural Network Mapping project. The successful candidate will work on developing advanced imaging techniques and computational models for neural network analysis.",
    "requirements": [
      "PhD in Neuroscience, Computer Science, or related field",
      "Strong background in neural imaging techniques",
      "Experience with computational modeling",
      "Programming skills (Python, MATLAB, or similar)"
    ],
    "type": "postdoc",
    "location": "On-site",
    "postedDate": "2023-09-01",
    "isOpen": true,
    "contactEmail": "applications@automatedlab.org",
    "closingDate": "2023-12-31",
    "projectId": "neural-mapping"
  },
  {
    "id": "job-002",
    "title": "PhD Student in Brain-Computer Interfaces",
    "description": "Join our lab as a PhD student working on cutting-edge brain-computer interface technologies. This position offers the opportunity to develop novel signal processing methods for real-time neural data analysis.",
    "requirements": [
      "Master's degree in Computer Science, Electrical Engineering, or Neuroscience",
      "Experience with signal processing",
      "Strong programming skills",
      "Background in machine learning is a plus"
    ],
    "type": "phd",
    "location": "On-site",
    "contactEmail": "applications@automatedlab.org",
    "postedDate": "2023-10-15",
    "projectId": "brain-computer",
    "isOpen": true
  },
  {
    "id": "job-003",
    "title": "Research Intern in Cognitive AI",
    "description": "Summer research internship position working on cognitive AI models. The intern will assist in implementing and testing AI algorithms that mimic human cognitive processes.",
    "requirements": [
      "Currently enrolled in Bachelor's or Master's program in Computer Science or related field",
      "Coursework in artificial intelligence or machine learning",
      "Programming experience in Python",
      "Interest in cognitive science"
    ],
    "type": "internship",
    "location": "Remote or On-site",
    "applicationUrl": "https://forms.automatedlab.org/internship",
    "postedDate": "2023-11-01",
    "closingDate": "2024-02-28",
    "projectId": "cognitive-ai",
    "isOpen": true
  }
];