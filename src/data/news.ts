export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
}

export const newsItems: NewsItem[] = [
  {
    "id": "news-1",
    "title": "New Study on Neural Network Mapping Published",
    "content": "Our team's research on advanced neural network mapping techniques has been published in the Journal of Neuroscience. The study details novel methods for visualizing complex neural interconnections with unprecedented clarity.",
    "date": "2023-10-15",
    "author": "Sedighe Raeisi",
    "featured": false,
    "tags": [
      "Team Update"
    ]
  },
  {
    "id": "news-2",
    "title": "Grant Awarded for Brain-Computer Interface Research",
    "content": "We're excited to announce that our lab has received a major grant to advance research on non-invasive brain-computer interfaces. This funding will support our work on developing more responsive and intuitive systems for neural signal processing.",
    "date": "2023-09-22",
    "author": "Michael Chen",
    "tags": [
      "Funding",
      "BCI"
    ]
  },
  {
    "id": "news-3",
    "title": "New Team Members Join the Lab",
    "content": "We're pleased to welcome two new doctoral students and a postdoctoral researcher to our team this fall. Their expertise in computational neuroscience and machine learning will be valuable additions to our ongoing projects.",
    "date": "2023-09-05",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "Team Update",
      "Test"
    ]
  },
  {
    "id": "news-4",
    "title": "Upcoming Workshop on Cognitive AI Models",
    "content": "Our lab will be hosting a workshop on cognitive AI models in neuroscience research next month. The event will feature presentations from leading experts in the field and hands-on sessions with our latest tools.",
    "date": "2023-08-18",
    "author": "Robert Smith",
    "tags": [
      "Event",
      "AI"
    ]
  },
  {
    "id": "news-5",
    "title": "Collaboration with National Research Institute Announced",
    "content": "We're excited to announce a new collaboration with the National Research Institute on Brain Sciences. This partnership will focus on developing shared resources and methodologies for advanced neuroimaging analysis.",
    "date": "2023-07-30",
    "author": "Sarah Johnson",
    "tags": [
      "Collaboration"
    ]
  }
];