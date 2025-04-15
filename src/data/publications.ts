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
  type: 'journal article' | 'conference proceeding' | 'workshop contribution' | 'book' | 'book chapter' | 'preprint' | 'thesis' | 'commentary';
  citation: string;
  projectId?: string;
}

export const publications: Publication[] = [
    {
      "id": "pub-001",
      "title": "Automating the practice of science: Opportunities, challenges, and implications",
      "journal": "Proceedings of the National Academy of Sciences",
      "year": 2025,
      "type": "journal article",
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
      "type": "journal article",
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
      "type": "journal article",
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
      "type": "journal article",
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
      "type": "journal article",
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
    },
    {
      "id": "pub-1744708691267",
      "title": "AutoRA: Automated research assistant for closed-loop empirical research",
      "journal": "Journal of Open Source Software",
      "year": 2024,
      "type": "journal article",
      "authors": [
        "Strittmatter, Y.",
        "Musslick, S."
      ],
      "citation": "Musslick, S., Andrew, B., Williams, C. C., Li, S., Marinescu, I., Dubova, M., ... & Holland, J. G. (2024). AutoRA: Automated research assistant for closed-loop empirical research. Journal of Open Source Software, 9(104), 6839.",
      "doi": "10.21105/joss.06839",
      "url": "https://doi.org/10.21105/joss.06839",
      "projectId": "project-1744383288085",
      "keywords": [
        "software",
        "Prolific",
        "Firebase",
        "Firestore",
        "web-based experiments"
      ]
    },
    {
      "id": "pub-1744710390287",
      "title": "Large language models surpass human experts in predicting neuroscience results",
      "journal": "Nature Human Behaviour",
      "year": 2024,
      "type": "journal article",
      "authors": [
        "Luo, X.",
        "Rechardt, A",
        "Sun, G.",
        "Nejad, K. K.",
        "Yáñez, F.",
        "Yilmaz, B.",
        "Lee, K.",
        "Cohen, A. O.",
        "Borghesani, V.  ",
        "Pashkov, A.",
        "Marinazzo, D.",
        "Nicholas, J.",
        "Salatiello, A.",
        "Sucholutsky, I.",
        "Minervini, P.",
        "Razavi, S.",
        "Rocca, R.",
        "Yusifov, E.",
        "Okalova, T.",
        "Gu, N.",
        "Ferianc, M.",
        "Khona, M.",
        "Patil, K. R.",
        "Lee, P.-S.",
        "Mata, R.",
        "Myers, N. E.",
        "Bizley, J. K.",
        "Musslick, S.",
        "Bilgin, I. P.",
        "Niso, G.",
        "Ales, J. M",
        "Gaebler, M.",
        "Murty, N. A. R. ",
        "Loued-Khenissi, L.",
        "Behler, A. ",
        "Hall, C. M.",
        "Dafflon, J. ",
        "Bao, S. D.",
        "Love, B. C"
      ],
      "citation": "Luo, X., Rechardt, A., Sun, G., Nejad, K. K., Yáñez, F., Yilmaz, B., ... & Love, B. C. (2024). Large language models surpass human experts in predicting neuroscience results. Nature human behaviour, 1-11.",
      "doi": "10.1038/s41562-024-02046-9",
      "url": "https://doi.org/10.1038/s41562-024-02046-9"
    },
    {
      "id": "pub-1744712125089",
      "title": "A jsPsych touchscreen extension for behavioral research on touch-enabled interfaces",
      "journal": "Behavior Research Methods",
      "year": 2024,
      "type": "journal article",
      "authors": [
        "Strittmatter, S.",
        "Spitzer, M. W. H.",
        "Ging-Jehli, N.",
        "Musslick, S."
      ],
      "citation": "Strittmatter, Y., Spitzer, M. W., Ging-Jehli, N., & Musslick, S. (2024). A jsPsych touchscreen extension for behavioral research on touch-enabled interfaces. Behavior Research Methods, 56(7), 7814-7830.",
      "doi": "10.3758/s13428-024-02454-9",
      "url": "https://doi.org/10.3758/s13428-024-02454-9",
      "keywords": [
        "web-based experiments"
      ]
    },
    {
      "id": "pub-1744716563446",
      "title": "Flexibility and stability can be both dependent and independent",
      "journal": "Nature Reviews Psychology",
      "year": 2024,
      "type": "book chapter",
      "authors": [
        "Dreisbach, G.",
        "Musslick, S.",
        "Braem, S."
      ],
      "citation": "Dreisbach, G., Musslick, S., & Braem, S. (2024). Flexibility and stability can be both dependent and independent. Nature Reviews Psychology, 3(9), 636-636.",
      "doi": "10.1038/s44159-024-00348-3",
      "url": "https://doi.org/10.1038/s44159-024-00348-3",
      "projectId": "project-1744383751212",
      "keywords": [
        "cognitive flexibility",
        "cognitive stability",
        "tradeoff"
      ]
    },
    {
  "id": "pub-1744719584837",
  "title": "Examining cognitive flexibility and stability through the lens of dynamical systems",
  "journal": "Current Opinion in Behavioral Sciences",
  "year": 2024,
  "type": "journal article",
  "authors": [
    "Musslick, S.",
    "Bizyaeva, A."
  ],
  "citation": "Musslick, S., & Bizyaeva, A. (2024). Examining cognitive flexibility and stability through the lens of dynamical systems. Current Opinion in Behavioral Sciences, 57, 101375.",
  "doi": "10.1016/j.cobeha.2024.101375",
  "url": "https://doi.org/10.1016/j.cobeha.2024.101375",
  "projectId": "project-1744383751212",
  "keywords": [
    "tradeoff",
    "rational boundedness",
    "cognitive control"
  ]
},
{
  "id": "pub-1744719753012",
  "title": "Closed-loop scientific discovery in the behavioral sciences",
  "journal": "PsyArXiv",
  "year": 2024,
  "type": "preprint",
  "authors": [
    "Musslick, S.",
    "Strittmatter, S.",
    "Dubova, M."
  ],
  "citation": "Musslick, S., Strittmatter, Y., & Dubova, M. (2024). Closed-loop scientific discovery in the behavioral sciences. PsyArXiv.",
  "doi": "10.31234/osf.io/c2ytb",
  "url": "https://doi.org/10.31234/osf.io/c2ytb",
  "projectId": "project-1744383288085",
  "keywords": [
    "automated scientific discovery"
  ]
},
{
  "id": "pub-1744719929858",
  "title": "Task performance errors and rewards affect voluntary task choices",
  "journal": "Psychological Research",
  "year": 2024,
  "type": "journal article",
  "authors": [
    "Spitzer, M. W. H.",
    "Musslick, S.",
    "Janz, J.",
    "Kiesel, A.",
    "Dignath, D."
  ],
  "citation": "Spitzer, M. W. H., Musslick, S., Janz, J., Kiesel, A., & Dignath, D. (2024). Task performance errors and rewards affect voluntary task choices. Psychological Research, 88(3), 892-909.",
  "doi": "10.1007/s00426-023-01908-7",
  "url": "https://doi.org/10.1007/s00426-023-01908-7",
  "projectId": "project-1744383751212"
},
{
  "id": "pub-1744721577387",
  "title": "Explore your experimental designs and theories before you exploit them!",
  "journal": "Behavioral and Brain Sciences",
  "year": 2024,
  "type": "commentary",
  "authors": [
    "Dubova, M.",
    "Sloman, S. J.",
    "Andrew, B.",
    "Nassar, M. R."
  ],
  "citation": "Dubova, M., Sloman, S. J., Andrew, B., Nassar, M. R., & Musslick, S. (2024). Explore your experimental designs and theories before you exploit them!. Behavioral and Brain Sciences, 47.",
  "doi": "10.1017/S0140525X23002303",
  "url": "https://doi.org/10.1017/S0140525X23002303",
  "projectId": "project-1744380957652"
},
{
  "id": "pub-1744722944290",
  "title": "Computational discovery of human reinforcement learning dynamics from choice behavior",
  "journal": "NeurIPS 2024 Workshop on Behavioral Machine Learning",
  "year": 2024,
  "type": "workshop contribution",
  "authors": [
    "Weinhardt, D.",
    "Eckstein, M.",
    "Musslick, S."
  ],
  "citation": "Weinhardt, D., Eckstein, M. K., & Musslick, S. (2024). Computational discovery of human reinforcement learning dynamics from choice behavior. In NeurIPS 2024 Workshop on Behavioral Machine Learning.",
  "url": "https://openreview.net/forum?id=x2WDZrpgmB",
  "projectId": "project-1744367667570",
  "keywords": [
    "SINDy",
    "equation discovery",
    "symbolic regression"
  ]
},
  {
  "id": "pub-1744728564846",
  "title": "On the Benefits of Heterogeneity in Cognitive Stability and Flexibility for Collaborative Task Switching",
  "journal": "Proceedings of the Annual Meeting of the Cognitive Science Society 48",
  "year": 2024,
  "type": "conference proceeding",
  "authors": [
    "Brondetta, A.",
    "Bizyaeva, A.",
    "Licas, M.",
    "Petri, G.",
    "Musslick, S."
  ],
  "citation": "Brondetta, A., Bizyaeva, A., Lucas, M., Petri, G., & Musslick, S. (2024). On the Benefits of Heterogeneity in Cognitive Stability and Flexibility for Collaborative Task Switching. In Proceedings of the 46th Annual Meeting of the Cognitive Science Society (pp. 5872– 5878).",
  "url": "https://escholarship.org/uc/item/6b47b61g",
  "projectId": "project-1744537991200"
}
];
