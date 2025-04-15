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
    "title": "Automating the practice of science: Opportunities, challenges, and implications",
    "journal": "Proceedings of the National Academy of Sciences",
    "year": 2025,
    "type": "journal",
    "authors": [
      "Musslick, S.",
      "Bartlett, L., K.",
      "Chandramouli, S. H.",
      "Dubova, M.",
      "Gobet, F.",
      "Griffiths, T. L. ",
      "Hullman, J.",
      "King, R. D.",
      "Kutz, N. J.",
      "Lucas, C. G.",
      "Mahesh, S.",
      "Pestilli, F.",
      "Sloman, S. J.",
      "Holmes, W. R."
    ],
    "citation": "Musslick, S., Bartlett, L. K., Chandramouli, S. H., Dubova, M., Gobet, F., Griffiths, T. L., ... & Holmes, W. R. (2025). Automating the practice of science: Opportunities, challenges, and implications. Proceedings of the National Academy of Sciences, 122(5), e2401238121.",
    "doi": "10.1073/pnas.2401238121",
    "url": "https://doi.org/10.1073/pnas.2401238121",
    "projectId": "project-1744383288085",
    "keywords": [
      "automated scientific practice",
      "automated model discovery",
      "automated experimental design"
    ]
  },
  {
    "id": "pub-002",
    "title": "Alternative models of funding curiosity-driven research",
    "journal": "Proceedings of the National Academy of Sciences",
    "year": 2025,
    "type": "journal",
    "authors": [
      "Gigerenzer, G.",
      "Allen, C.",
      "Gaillard, S.",
      "Goldstone, G. L.",
      "Haaf, J.",
      "Holmes, W. R.",
      "Kashima, Y.",
      "Motz, B.",
      "Musslick, S.",
      "Stefan, A."
    ],
    "citation": "Gigerenzer, G., Allen, C., Gaillard, S., Goldstone, R. L., Haaf, J., Holmes, W. R., ... & Stefan, A. (2025). Alternative models of funding curiosity-driven research. Proceedings of the National Academy of Sciences, 122(5), e2401237121.",
    "doi": "10.1073/pnas.2401237121",
    "url": "https://doi.org/10.1073/pnas.2401237121",
    "projectId": "neural-mapping",
    "keywords": [
      "scientific practice"
    ]
  },
  {
    "id": "pub-003",
    "title": "SweetBean: A declarative language for behavioral experiments with human and artificial participants",
    "journal": "Journal of Open Source Software",
    "year": 2025,
    "type": "journal",
    "authors": [
      "Strittmatter, Y.",
      "Musslick, S."
    ],
    "citation": "Strittmatter, Y., & Musslick, S. (2025). SweetBean: A declarative language for behavioral experiments with human and artificial participants. Journal of Open Source Software, 10(107), 7703.",
    "doi": "10.21105/joss.07703",
    "url": "https://joss.theoj.org/papers/10.21105/joss.07703",
    "projectId": "project-1744383465177",
    "keywords": [
      "LLM",
      "web-based experiments",
      "behavioral experimentation"
    ]
  },
  {
    "id": "pub-004",
    "title": "The misalignment of incentives in academic publishing and implications for journal reform",
    "journal": "Proceedings of the National Academy of Sciences",
    "year": 2025,
    "type": "journal",
    "authors": [
      "Trueblood, S. J.",
      "Allison, D. B.",
      "Field, S. M.",
      "Fishbach, A.",
      "Gaillard, S. DM.",
      "Gigerenzer, G.",
      "Holmes, W. R.",
      "Lewandowsky, S.",
      "Matzke, D.",
      "Murphy, M. C.",
      "Musslick, S.",
      "Popov, V.",
      "Roskies, A. L.",
      "Schure, J. T.",
      "Teodorescu, A. R."
    ],
    "citation": "Trueblood, J. S., Allison, D. B., Field, S. M., Fishbach, A., Gaillard, S. D., Gigerenzer, G., ... & Teodorescu, A. R. (2025). The misalignment of incentives in academic publishing and implications for journal reform. Proceedings of the National Academy of Sciences, 122(5), e2401231121.",
    "doi": "10.1073/pnas.2401231121",
    "url": "https://doi.org/10.1073/pnas.2401231121",
    "projectId": "brain-computer",
    "keywords": [
      "scientific practice"
    ]
  },
  {
    "id": "pub-005",
    "title": "Is Ockham’s razor losing its edge? New perspectives on the principle of model parsimony",
    "journal": "Proceedings of the National Academy of Sciences",
    "year": 2025,
    "type": "journal",
    "authors": [
      "Dubova, M.",
      "Chandramouli, S.",
      "Gigerenzer, G.",
      "Grünwald, P.",
      "Holmes, W. R.",
      "Lombrozo, T.",
      "Marelli, M.",
      "Musslick, S.",
      "Nicenboim, B.",
      "Ross, L. N.",
      "Shiffrin, S.",
      "White, M.",
      "Wagenmakers, E.",
      "Bürkner, P.",
      "Sloman, S. J."
    ],
    "citation": "Dubova, M., Chandramouli, S., Gigerenzer, G., Grünwald, P., Holmes, W., Lombrozo, T., ... & Sloman, S. J. (2025). Is Ockham’s razor losing its edge? New perspectives on the principle of model parsimony. Proceedings of the National Academy of Sciences, 122(5), e2401230121.",
    "doi": "10.1073/pnas.2401230121",
    "url": "https://doi.org/10.1073/pnas.2401230121",
    "projectId": "project-1744367667570",
    "keywords": [
      "scientific practice"
    ]
  }
];
