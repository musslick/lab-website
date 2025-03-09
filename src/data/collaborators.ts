export interface Collaborator {
  id: string;
  name: string;
  url: string;
  logo?: string;
}

export const collaborators: Collaborator[] = [
  {
    id: "uni-science",
    name: "University of Science",
    url: "https://www.universityscience.edu"
  },
  {
    id: "research-lab",
    name: "National Research Lab",
    url: "https://www.nationalresearchlab.org"
  },
  {
    id: "tech-institute",
    name: "Tech Institute",
    url: "https://www.techinstitute.org"
  }
];
