export interface Collaborator {
  id: string;
  name: string;
  url: string;
  logo?: string;
}

export const collaborators: Collaborator[] = [
  {
    "id": "uni-science",
    "name": "Princeton University",
    "url": "https://www.princeton.edu/",
    "logo": "https://logos-world.net/wp-content/uploads/2023/02/Princeton-Emblem.png"
  },
  {
    "id": "research-lab",
    "name": "Brown University",
    "url": "https://www.brown.edu/",
    "logo": "https://logodix.com/logo/1078971.png"
  },
  {
    "id": "tech-institute",
    "name": "Harvard University",
    "url": "https://www.harvard.edu/",
    "logo": "https://logosmarcas.net/wp-content/uploads/2020/12/Harvard-Emblema.png"
  },
  {
    "id": "collab-1741542842919",
    "name": "Google Deepmind",
    "url": "https://deepmind.google/",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Google_DeepMind_logo.svg"
  }
];
