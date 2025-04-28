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
  projectId?: string; // Keep for backward compatibility
  projectIds?: string[]; // Multiple projects support
  softwareIds?: string[]; // Add support for related software
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
    "projectIds": [
      "project-1744367667570",
      "project-1744380957652",
      "project-1744383288085"
    ],
    "projectId": "project-1744367667570",
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
    "projectIds": [
      "project-1744380957652",
      "project-1744383288085",
      "project-1744383465177"
    ],
    "projectId": "project-1744380957652",
    "softwareIds": [
      "cogni-sim"
    ],
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
    "projectIds": [
      "project-1744367667570",
      "project-1744380957652",
      "project-1744383288085",
      "project-1744383465177"
    ],
    "projectId": "project-1744367667570",
    "softwareIds": [
      "brain-mapper"
    ],
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
    "type": "commentary",
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
      "tradeoff",
      "cognitive control"
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
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200",
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
    "projectIds": [
      "project-1744367667570",
      "project-1744380957652",
      "project-1744383288085",
      "project-1744383465177"
    ],
    "projectId": "project-1744367667570",
    "softwareIds": [
      "brain-mapper"
    ],
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
    "projectIds": [
      "project-1744367667570"
    ],
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
    "journal": "Proceedings of the 48th Annual Meeting of the Cognitive Science Society",
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
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200",
    "softwareIds": [
      "software-1745315215124"
    ]
  },
  {
    "id": "pub-1744736334974",
    "title": "Improving Concepts in Cognitive Science",
    "journal": "Proceedings of the 48th Annual Meeting of the Cognitive Science Society",
    "year": 2024,
    "type": "conference proceeding",
    "authors": [
      "Dubova, M.",
      "Barrett, L. F.",
      "Goldstone, R.",
      "Musslick, S.",
      "Poldrack, R."
    ],
    "citation": "Dubova, M., Barrett, L. F., Goldstone, R., Musslick, S., & Poldrack, R. (2024). Improving Concepts in Cognitive Science. In Proceedings of the 46th Annual Meeting of the Cognitive Science Society (pp. 1– 2).",
    "url": "https://escholarship.org/uc/item/72v1s5bh"
  },
  {
    "id": "pub-1744736607819",
    "title": "A meta-learning framework for rationalizing cognitive fatigue in neural systems",
    "journal": "Proceedings of the 48th Annual Meeting of the Cognitive Science Society",
    "year": 2024,
    "type": "conference proceeding",
    "authors": [
      "Li, Y.",
      "Carrasco-Davis, R.",
      "Strittmatter, Y.",
      "Sarao Mannelli, S.",
      "Musslick, S."
    ],
    "citation": "Li, Y., Carrasco-Davis, R., Strittmatter, Y., Sarao Mannelli, S., & Musslick, S. (2024). A meta-learning framework for rationalizing cognitive fatigue in neural systems. In Proceedings of the 46th Annual Meeting of the Cognitive Science Society (pp. 1598– 1606).",
    "url": "https://escholarship.org/uc/item/8pn5q3kx",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200",
    "keywords": [
      "cognitive control",
      "meta-control"
    ]
  },
  {
    "id": "pub-1744736825251",
    "title": "Meta-Control",
    "journal": "Encyclopedia of the Human Brain, Second Edition: Volumes 1-5",
    "year": 2024,
    "type": "book chapter",
    "authors": [
      "Musslick, S.",
      "Goschke, T.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Cohen, J. D., & Goschke, T. (2024). Meta-control. In Encyclopedia of the Human Brain, Second Edition: Volumes 1-5 (pp. V3-269). Elsevier.",
    "doi": "10.1016/B978-0-12-820480-1.00058-9",
    "url": "https://doi.org/10.1016/B978-0-12-820480-1.00058-9",
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1744891086200",
    "title": "GFN-SR: Symbolic regression with generative flow networks",
    "journal": "NeurIPS 2023 AI for Science Workshop",
    "year": 2023,
    "type": "workshop contribution",
    "authors": [
      "Li, S.",
      "Marinescu, I.",
      "Musslick, S."
    ],
    "citation": "Li, S., Marinescu, I., & Musslick, S. (2023). GFN-SR: Symbolic regression with generative flow networks. NeurIPS 2023 AI for Science Workshop.",
    "url": "https://arxiv.org/abs/2312.00396",
    "projectIds": [
      "project-1744367667570"
    ],
    "projectId": "project-1744367667570",
    "keywords": [
      "equation discovery",
      "generative flow networks"
    ]
  },
  {
    "id": "pub-1744896020699",
    "title": "An Information-Theoretic Approach to Reward Rate Optimization in the Tradeoff Between Controlled and Automatic Processing in Neural Network Architectures",
    "journal": "eLife",
    "year": 2023,
    "type": "journal article",
    "authors": [
      "Petri, G.",
      "Musslick, S.",
      "Cohen, J. D."
    ],
    "citation": "Petri, G., Musslick, S., & Cohen, J. D. (2024). An information-theoretic approach to reward rate optimization in the tradeoff between controlled and automatic processing in neural network architectures. eLife, 13, RP93251.",
    "url": "https://doi.org/10.7554/eLife.93251.1",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200",
    "keywords": [
      "information theory"
    ]
  },
  {
    "id": "pub-1744896816957",
    "title": "An integrative effort: Bridging motivational intensity theory and recent neurocomputational and neuronal models of effort and control allocation",
    "journal": "Psychological Review",
    "year": 2023,
    "type": "journal article",
    "authors": [
      "Silvestrini, N.",
      "Musslick*, S.",
      "Berry*, A.",
      "Vassena*, E."
    ],
    "citation": "Silvestrini, N., Musslick, S., Berry, A. S., & Vassena, E. (2023). An integrative effort: Bridging motivational intensity theory and recent neurocomputational and neuronal models of effort and control allocation. Psychological Review, 130(4), 1081.",
    "doi": "10.1037/rev0000372",
    "url": "https://doi.org/10.1037/rev0000372",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212",
    "keywords": [
      "cognitive control",
      "expected value of control"
    ]
  },
  {
    "id": "pub-1744915075456",
    "title": "Assignment strategies modulate students’ academic performance in an online learning environment during the first and second COVID-19 related school closures",
    "journal": "Plos One",
    "year": 2023,
    "type": "journal article",
    "authors": [
      "Spitzer, M. W. H.",
      "Moeller, K.",
      "Musslick, S."
    ],
    "citation": "Spitzer, M. W. H., Moeller, K., & Musslick, S. (2023). Assignment strategies modulate students’ academic performance in an online learning environment during the first and second COVID-19 related school closures. Plos one, 18(5), e0284868.",
    "doi": "10.1371/journal.pone.0284868",
    "url": "https://doi.org/10.1371/journal.pone.0284868"
  },
  {
    "id": "pub-1744915188782",
    "title": "Pushing the bounds of bounded optimality and rationality",
    "journal": "Cognitive Science",
    "year": 2023,
    "type": "journal article",
    "authors": [
      "Musslick, S.",
      "Masís, J."
    ],
    "citation": "Musslick, S., & Masís, J. (2023). Pushing the bounds of bounded optimality and rationality. Cognitive Science, 47(4), e13259.",
    "doi": "10.1111/cogs.13259",
    "url": "https://doi.org/10.1111/cogs.13259",
    "projectIds": [
      "project-1744537991200"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1744915427122",
    "title": "Expression sampler as a dynamic benchmark for symbolic regression",
    "journal": "NeurIPS 2023 AI for Science Workshop",
    "year": 2023,
    "type": "workshop contribution",
    "authors": [
      "Marinescu, I.",
      "Strittmatter, Y.",
      "Williams, C. C.",
      "Musslick, S."
    ],
    "citation": "Marinescu, I., Strittmatter, Y., Williams, C. C., & Musslick, S. (2023). Expression sampler as a dynamic benchmark for symbolic regression. In NeurIPS 2023 AI for Science Workshop.",
    "url": "https://openreview.net/forum?id=i3PecpoiPG",
    "projectIds": [
      "project-1744367667570"
    ],
    "projectId": "project-1744367667570"
  },
  {
    "id": "pub-1744915527595",
    "title": "Bayesian machine scientist for model discovery in psychology",
    "journal": "NeurIPS 2023 AI for Science Workshop",
    "year": 2023,
    "type": "workshop contribution",
    "authors": [
      "Hewson, J.",
      "Strittmatter, Y.",
      "Marinescu, I.",
      "Williams, C. C.",
      "Musslick, S."
    ],
    "citation": "Hewson, J. T. S., Strittmatter, Y., Marinescu, I., Williams, C. C., & Musslick, S. (2023). Bayesian machine scientist for model discovery in psychology. In NeurIPS 2023 AI for Science Workshop.",
    "url": "https://openreview.net/forum?id=XHFfvzlQ1n",
    "projectIds": [
      "project-1744367667570"
    ],
    "projectId": "project-1744367667570",
    "softwareIds": [
      "brain-mapper"
    ]
  },
  {
    "id": "pub-1744922642928",
    "title": "An evaluation of experimental sampling strategies for autonomous empirical research in cognitive science",
    "journal": "Proceedings of the 45th Annual Meeting of the Cognitive Science Society ",
    "year": 2023,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Hewson, J. T. S.",
      "Andrew, B. W.",
      "Strittmatter, Y.",
      "Williams, C. C.",
      "Dang, G. T.",
      "Dubova, M.",
      "Holland, J. G."
    ],
    "citation": "Musslick, S., Hewson, J. T., Andrew, B. W., Strittmatter, Y., Williams, C. C., Dang, G. T., ... & Holland, J. G. (2023). An evaluation of experimental sampling strategies for autonomous empirical research in cognitive science. In Proceedings of the 45th Annual Meeting of the Cognitive Science Society (pp. 1386–1392).",
    "url": "https://escholarship.org/uc/item/5ch569fg",
    "projectIds": [
      "project-1744380957652"
    ],
    "projectId": "project-1744380957652",
    "keywords": [
      "random sampling",
      "metascience"
    ]
  },
  {
    "id": "pub-1745760067373",
    "title": "Augmenting EEG with generative adversarial networks enhances brain decoding across classifiers and sample sizes",
    "journal": "Proceedings of the 45th Annual Meeting of the Cognitive Science Society",
    "year": 2023,
    "type": "conference proceeding",
    "authors": [
      "Williams, C. C.",
      "Weinhardt, D.",
      "Wirzberger, M.",
      "Musslick, S."
    ],
    "citation": "Williams, C. C., Weinhardt, D., Wirzberger, M., & Musslick, S. (2023). Augmenting EEG with generative adversarial networks enhances brain decoding across classifiers and sample sizes. In Proceedings of the 45th Annual Meeting of the Cognitive Science Society (pp. 1770–1776).",
    "url": "https://escholarship.org/uc/item/9gz8g908",
    "softwareIds": [
      "software-1744661083211"
    ],
    "keywords": [
      "data augmentation"
    ]
  },
  {
    "id": "pub-1745760413224",
    "title": "A benchmark for compositional visual reasoning",
    "journal": "Advances in Neural Information Processing Systems",
    "year": 2022,
    "type": "conference proceeding",
    "authors": [
      "Zerroug, A.",
      "Vaishnav, M.",
      "Colin, J.",
      "Musslick, S.",
      "Serre, T."
    ],
    "citation": "Zerroug, A., Vaishnav, M., Colin, J., Musslick, S., & Serre, T. (2022). A benchmark for compositional visual reasoning. Advances in Neural Information Processing Systems, 35, 29776-29788.",
    "url": "https://proceedings.neurips.cc/paper_files/paper/2022/file/c08ee8fe3d19521f3bfa4102898329fd-Paper-Datasets_and_Benchmarks.pdf"
  },
  {
    "id": "pub-1745777833743",
    "title": "SweetPea: A standard language for factorial experimental design",
    "journal": "Behavior Research Methods",
    "year": 2022,
    "type": "journal article",
    "authors": [
      "Musslick, S.",
      "Cherkaev, A.",
      "Draut, B.",
      "Butt, A.",
      "Darragh, P.",
      "Srikumar, V.",
      "Flatt, M.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Cherkaev, A., Draut, B., Butt, A. S., Darragh, P., Srikumar, V., ... & Cohen, J. D. (2022). SweetPea: A standard language for factorial experimental design. Behavior Research Methods, 1-25.",
    "doi": "10.3758/s13428-021-01598-2",
    "url": "https://link.springer.com/article/10.3758/s13428-021-01598-2",
    "projectIds": [
      "project-1744380957652",
      "project-1744383288085"
    ],
    "projectId": "project-1744380957652",
    "softwareIds": [
      "neuro-bci"
    ],
    "keywords": [
      "SAT sampling"
    ]
  },
  {
    "id": "pub-1745778121908",
    "title": "Leveraging psychometrics of rational inattention to estimate individual differences in the capacity for cognitive control",
    "journal": "Proceedings of the 44th Annual Meeting of the Cognitive Science Society",
    "year": 2022,
    "type": "conference proceeding",
    "authors": [
      "Ham, H.",
      "Grahek, I.",
      "Bustamante, L. A.",
      "Daw, N.",
      "Caplin, A.",
      "Musslick, S."
    ],
    "citation": "Ham, H., Grahek, I., Bustamante, L. A., Daw, N., Caplin, A., & Musslick, S. (2022). Leveraging psychometrics of rational inattention to estimate individual differences in the capacity for cognitive control. In Proceedings of the 44th Annual Meeting of the Cognitive Science Society (pp. 2222-2229).",
    "url": "https://escholarship.org/uc/item/7v97g8j5",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212",
    "keywords": [
      "control allocation"
    ]
  },
  {
    "id": "pub-1745790290408",
    "title": "Rationalizing constraints on the capacity for cognitive control",
    "journal": "Trends in Cognitive Sciences",
    "year": 2021,
    "type": "journal article",
    "authors": [
      "Musslick, S.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., & Cohen, J. D. (2021). Rationalizing constraints on the capacity for cognitive control. Trends in cognitive sciences, 25(9), 757-775.",
    "doi": "10.1016/j.tics.2021.06.001",
    "url": "https://doi.org/10.1016/j.tics.2021.06.001",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1745790426187",
    "title": "Academic performance of K-12 students in an online-learning environment for mathematics increased during the shutdown of schools in wake of the COVID-19 pandemic",
    "journal": "PloS One",
    "year": 2021,
    "type": "journal article",
    "authors": [
      "Spitzer, M. W. H. ",
      "Musslick, S."
    ],
    "citation": "Spitzer, M. W. H., & Musslick, S. (2021). Academic performance of K-12 students in an online-learning environment for mathematics increased during the shutdown of schools in wake of the COVID-19 pandemic. PloS one, 16(8), e0255629.",
    "doi": "10.1371/journal.pone.0255629",
    "url": "https://doi.org/10.1371/journal.pone.0255629"
  },
  {
    "id": "pub-1745790525917",
    "title": "Meta-control: From psychology to computational neuroscience",
    "journal": "Cognitive, Affective, & Behavioral Neuroscience",
    "year": 2021,
    "type": "journal article",
    "authors": [
      "Eppinger, B.",
      "Goschke, T.",
      "Musslick, S."
    ],
    "citation": "Eppinger, B., Goschke, T., & Musslick, S. (2021). Meta-control: From psychology to computational neuroscience. Cognitive, Affective, & Behavioral Neuroscience, 21(3), 447-452.",
    "doi": "10.3758/s13415-021-00919-4",
    "url": "https://doi.org/10.3758/s13415-021-00919-4",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745790668972",
    "title": "Learning to overexert cognitive control in a Stroop task",
    "journal": "Cognitive, Affective, & Behavioral Neuroscience",
    "year": 2021,
    "type": "journal article",
    "authors": [
      "Bustamante*, L.",
      "Lieder*, F.",
      "Musslick, S.",
      "Shenhav, A.",
      "Cohen, J. D."
    ],
    "citation": "Bustamante, L., Lieder, F., Musslick, S., Shenhav, A., & Cohen, J. (2021). Learning to overexert cognitive control in a Stroop task. Cognitive, Affective, & Behavioral Neuroscience, 21, 453-471.",
    "doi": "10.3758/s13415-020-00845-x",
    "url": "https://doi.org/10.3758/s13415-020-00845-x",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745790778952",
    "title": "Topological limits to the parallel processing capability of network architectures",
    "journal": "Nature Physics ",
    "year": 2021,
    "type": "journal article",
    "authors": [
      "Petri*, G.",
      "Musslick*, S.",
      "Dey, B.",
      "Özcimder, K.",
      "Turner, D.",
      "Ahmed, N. K.",
      "Willke, T. L.",
      "Cohen, J. D."
    ],
    "citation": "Petri, G., Musslick, S., Dey, B., Özcimder, K., Turner, D., Ahmed, N. K., ... & Cohen, J. D. (2021). Topological limits to the parallel processing capability of network architectures. Nature Physics, 17(5), 646-651.",
    "doi": "10.1038/s41567-021-01170-x",
    "url": "https://doi.org/10.1038/s41567-021-01170-x",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1745790950108",
    "title": "Recovering quantitative models of human information processing with differentiable architecture search",
    "journal": "In Proceedings of the 43rd Annual Conference of the Cognitive Science Society",
    "year": 2021,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S."
    ],
    "citation": "Musslick, S. (2021). Recovering quantitative models of human information processing with differentiable architecture search. In Proceedings of the 43rd Annual Conference of the Cognitive Science Society (pp. 1837 – 1843).",
    "url": "https://escholarship.org/content/qt9wd571ts/qt9wd571ts_noSplash_09fd8880773599de91894a910a676b19.pdf",
    "projectIds": [
      "project-1744367667570"
    ],
    "projectId": "project-1744367667570",
    "keywords": [
      "NAS"
    ]
  },
  {
    "id": "pub-1745791250191",
    "title": "The value of learning and cognitive control allocation",
    "journal": "In Proceedings of the 43rd Annual Conference of the Cognitive Science Society",
    "year": 2021,
    "type": "conference proceeding",
    "authors": [
      "Masis, J.",
      "Musslick, S.",
      "Cohen, J. D."
    ],
    "citation": "Masís, J. A., Musslick, S., & Cohen, J. (2021). The value of learning and cognitive control allocation. In Proceedings of the 43rd Annual Conference of the Cognitive Science Society (pp. 348 – 354).",
    "url": "https://escholarship.org/uc/item/7w0223v0#:~:text=Current%20models%20of%20cognitive%20control,task%20when%20estimating%20its%20value.",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745791442007",
    "title": "On the rational boundedness of cognitive control: Shared versus separated representations",
    "journal": "PsyArXiv",
    "year": 2020,
    "type": "preprint",
    "authors": [
      "Musslick, S.",
      "Saxe, A. ",
      "Hoskin, A. N.",
      "Sagiv, Y.",
      "Reichman, D.",
      "Petri, G.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Saxe, A., Hoskin, A. N., Sagiv, Y., Reichman, D., Petri, G., & Cohen, J. D. (2020). On the rational boundedness of cognitive control: Shared versus separated representations.",
    "doi": "10.31234/osf.io/jkhdf",
    "url": "https://osf.io/preprints/psyarxiv/jkhdf_v1",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1745842243211",
    "title": "A computational perspective on the roles of affect in cognitive control",
    "journal": "International Journal of Psychophysiology",
    "year": 2020,
    "type": "journal article",
    "authors": [
      "Grahek*, I.",
      "Musslick*, S.",
      "Shenhav, A."
    ],
    "citation": "Grahek, I., Musslick, S., & Shenhav, A. (2020). A computational perspective on the roles of affect in cognitive control. International Journal of Psychophysiology, 151, 25-34.",
    "doi": "10.1016/j.ijpsycho.2020.02.001",
    "url": "https://doi.org/10.1016/j.ijpsycho.2020.02.001",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745842388190",
    "title": "Mental effort: One construct, many faces?",
    "journal": "Proceedings of the 42nd Annual Meeting of the Cognitive Science Society",
    "year": 2020,
    "type": "workshop contribution",
    "authors": [
      "Wirzberger, M.",
      "Grahek, I.",
      "Bustamante, L.",
      "Shenhav, A.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Wirzberger, M., Grahek, I., Bustamante, L., Shenhav, A., & Cohen, J. D. (2020). Mental effort: One construct, many faces?. In Proceedings of the 42nd Annual Meeting of the Cognitive Science Society (pp. 1–2).",
    "url": "https://escholarship.org/content/qt3f33p0sd/qt3f33p0sd.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745842525116",
    "title": "Motivation and cognitive control in depression",
    "journal": "Neuroscience & Biobehavioral Reviews",
    "year": 2019,
    "type": "journal article",
    "authors": [
      "Grahek, I.",
      "Shenhav, A.",
      "Musslick, S.",
      "Krebs, R. M.",
      "Koster, E. H."
    ],
    "citation": "Grahek, I., Shenhav, A., Musslick, S., Krebs, R. M., & Koster, E. H. (2019). Motivation and cognitive control in depression. Neuroscience & Biobehavioral Reviews, 102, 371-381.",
    "doi": "10.1016/j.neubiorev.2019.04.011",
    "url": "https://doi.org/10.1016/j.neubiorev.2019.04.011",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212",
    "keywords": [
      "computational psychiatry"
    ]
  },
  {
    "id": "pub-1745843283414",
    "title": "Understanding interactions amongst cognitive control, learning and representation",
    "journal": "Proceedings of the 41st Annual Meeting of the Cognitive Science Society",
    "year": 2019,
    "type": "workshop contribution",
    "authors": [
      "Musslick, S.",
      "Novick, A. H.",
      "Webb, T.",
      "Frankland, S.",
      "Cohen, J. D.",
      "Jackson, R. J.",
      "Ralph, M. A. L.",
      "Chen, L.",
      "Rogers, T. T."
    ],
    "citation": "Musslick, S., Novick, A. H., Webb, T., Frankland, S., Cohen, J., Jackson, R. J., ... & Rogers, T. T. (2019). Understanding interactions amongst cognitive control, learning and representation. In Proceedings of the 41st Annual Meeting of the Cognitive Science Society (pp. 35 – 26).",
    "url": "https://escholarship.org/content/qt1dk0g95w/qt1dk0g95w.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745856499310",
    "title": "Stability-Flexibility Dilemma in Cognitive Control: A Dynamical System Perspective",
    "journal": "Proceedings of the 41st Annual Meeting of the Cognitive Science Society",
    "year": 2019,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Bizyaeva, A.",
      "Agaron, S.",
      "Leonard, N.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Bizyaeva, A., Agaron, S., Leonard, N., & Cohen, J. D. (2019). Stability-flexibility dilemma in cognitive control: A dynamical system perspective. In Proceedings of the 41st Annual Meeting of the Cognitive Science Society (pp. 2420 – 2426).",
    "url": "https://escholarship.org/content/qt3342x11v/qt3342x11v.pdf",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200",
    "softwareIds": [
      "software-1745315215124"
    ]
  },
  {
    "id": "pub-1745856703857",
    "title": "A Mechanistic Account of Constraints on Control-Dependent Processing: Shared Representation, Conflict and Persistence",
    "journal": "Proceedings of the 41st Annual Meeting of the Cognitive Science Society",
    "year": 2019,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., & Cohen, J. D. (2019). A mechanistic account of constraints on control-dependent processing: Shared representation, conflict and persistence. In Proceedings of the 41st Annual Meeting of the Cognitive Science Society (pp. 849 – 855).",
    "url": "https://escholarship.org/content/qt0q15s405/qt0q15s405_noSplash_457f855b4dd9018590e3b7840e9886f1.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745856779899",
    "title": "Decomposing Individual Differences in Cognitive Control: A Model-Based Approach",
    "journal": "Proceedings of the 41st Annual Meeting of the Cognitive Science Society",
    "year": 2019,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Cohen, J. D.",
      "Shenhav, A."
    ],
    "citation": "Musslick, S., Cohen, J. D., & Shenhav, A. (2019). Decomposing individual differences in cognitive control: A model-based approach. In Proceedings of the 41st Annual Meeting of the Cognitive Science Society (pp. 2427 – 2433).",
    "url": "https://escholarship.org/content/qt95f995wb/qt95f995wb.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745856879360",
    "title": "Asymmetric Switch Costs as a Function of Task Strength",
    "journal": "Proceedings of the 41st Annual Meeting of the Cognitive Science Society",
    "year": 2019,
    "type": "conference proceeding",
    "authors": [
      "Spitzer*, M.",
      "Musslick*, S.",
      "Shvartsman, M.",
      "Shenhav, A.",
      "Cohen, J. D."
    ],
    "citation": "Spitzer, M., Musslick, S., Shvartsman, M., Shenhav, A., & Cohen, J. D. (2019). Asymmetric Switch Costs as a Function of Task Strength. In Proceedings of the 41st Annual Meeting of the Cognitive Science Society (pp. 1070-1076).",
    "url": "https://www.shenhavlab.org/s/Spitzer_5_9.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745864928043",
    "title": "Dissociable neural mechanisms track evidence accumulation for selection of attention versus action",
    "journal": "Nature Communications",
    "year": 2018,
    "type": "journal article",
    "authors": [
      "Shenhav, A.",
      "Straccia, M. A.",
      "Musslick, S.",
      "Cohen, J. D.",
      "Botvinick, M. M."
    ],
    "citation": "Shenhav, A., Straccia, M. A., Musslick, S., Cohen, J. D., & Botvinick, M. M. (2018). Dissociable neural mechanisms track evidence accumulation for selection of attention versus action. Nature communications, 9(1), 2485.",
    "doi": "10.1038/s41467-018-04841-1",
    "url": "https://doi.org/10.1038/s41467-018-04841-1",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212",
    "keywords": [
      "fMRI"
    ]
  },
  {
    "id": "pub-1745865035111",
    "title": "Rational metareasoning and the plasticity of cognitive control",
    "journal": "PLoS Computational Biology ",
    "year": 2018,
    "type": "journal article",
    "authors": [
      "Lieder, F.",
      "Shenhav, A.",
      "Musslick, S.",
      "Griffiths, T. L."
    ],
    "citation": "Lieder, F., Shenhav, A., Musslick, S., & Griffiths, T. L. (2018). Rational metareasoning and the plasticity of cognitive control. PLoS Computational Biology, 14(4), e1006043.",
    "doi": "10.1371/journal.pcbi.1006043",
    "url": "https://doi.org/10.1371/journal.pcbi.1006043",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1745865151727",
    "title": "Constraints associated with cognitive control and the stability-flexibility dilemma",
    "journal": "Proceedings of the 40th Annual Meeting of the Cognitive Science Society",
    "year": 2018,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Jang, S. J.",
      "Shvartsman, M.",
      "Shenhav, A.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Jang, S. J., Shvartsman, M., Shenhav, A., & Cohen, J. D. (2018). Constraints associated with cognitive control and the stability-flexibility dilemma. In Proceedings of the 40th Annual Meeting of the Cognitive Science Society (pp. 804 – 809).",
    "url": "https://escholarship.org/content/qt7nm3c7xj/qt7nm3c7xj.pdf",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200",
    "softwareIds": [
      "software-1745315215124"
    ]
  },
  {
    "id": "pub-1745865348347",
    "title": "Estimating the costs of cognitive control from task performance: theoretical validation and potential pitfalls",
    "journal": "Proceedings of the 40th Annual Meeting of the Cognitive Science Society",
    "year": 2018,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Cohen, J. D.",
      "Shenhav, A."
    ],
    "citation": "Musslick, S., Cohen, J. D., & Shenhav, A. (2018). Estimating the costs of cognitive control from task performance: theoretical validation and potential pitfalls. In Proceedings of the 40th Annual Meeting of the Cognitive Science Society (pp. 800 – 8005).",
    "url": "https://escholarship.org/content/qt59r5d8sk/qt59r5d8sk.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745865523935",
    "title": "Efficiency of learning vs. processing: Towards a normative theory of multitasking",
    "journal": "Proceedings of the 40th Annual Meeting of the Cognitive Science Society",
    "year": 2018,
    "type": "conference proceeding",
    "authors": [
      "Sagiv, Y.",
      "Musslick, S.",
      "Niv, Y.",
      "Cohen, J. D."
    ],
    "citation": "Sagiv, Y., Musslick, S., Niv, Y., & Cohen, J. D. (2020). Efficiency of learning vs. processing: Towards a normative theory of multitasking. In Proceedings of the 40th Annual Meeting of the Cognitive Science Society (pp. 1002 – 1007).",
    "url": "https://escholarship.org/uc/item/8501s6t8",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1745866123035",
    "title": "Multitasking Capability Versus Learning Efficiency in Neural Network Architectures",
    "journal": "Proceedings of the 39th Annual Meeting of the Cognitive Science Society",
    "year": 2017,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Saxe, A. M.",
      "Ozcimder, K.",
      "Dey, B.",
      "Henselman, G.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Saxe, A. M., Ozcimder, K., Dey, B., Henselman, G., & Cohen, J. D. (2017). Multitasking Capability Versus Learning Efficiencyin Neural Network Architectures. In Proceedings of the 39th Annual Meeting of the Cognitive Science Society (pp. 829 – 834). ",
    "url": "https://escholarship.org/content/qt5t85k9bm/qt5t85k9bm.pdf",
    "projectIds": [
      "project-1744537991200",
      "project-1744383751212"
    ],
    "projectId": "project-1744537991200"
  },
  {
    "id": "pub-1745866319882",
    "title": "Toward a rational and mechanistic account of mental effort",
    "journal": "Annual Review of Neuroscience",
    "year": 2017,
    "type": "journal article",
    "authors": [
      "Shenhav, A.",
      "Musslick, S.",
      "Lieder, F.",
      "Kool, W.",
      "Griffiths, T. L.",
      "Cohen, J. D.",
      "Botvinick, M. M."
    ],
    "citation": "Shenhav, A., Musslick, S., Lieder, F., Kool, W., Griffiths, T. L., Cohen, J. D., & Botvinick, M. M. (2017). Toward a rational and mechanistic account of mental effort. Annual review of neuroscience, 40(1), 99-124.",
    "doi": "10.1146/annurev-neuro-072116-031526",
    "url": "https://doi.org/10.1146/annurev-neuro-072116-031526",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745866581913",
    "title": "Learning to (mis) allocate control: maltransfer can lead to self-control failure",
    "journal": "The 3rd Multidisciplinary Conference on Reinforcement Learning and Decision Making",
    "year": 2017,
    "type": "conference proceeding",
    "authors": [
      "Bustamante, L.",
      "Lieder, F.",
      "Musslick, S.",
      "Shenhav, A.",
      "Cohen, J. D."
    ],
    "citation": "Bustamante, L., Lieder, F., Musslick, S., Shenhav, A., & Cohen, J. D. (2017). Learning to (mis) allocate control: maltransfer can lead to self-control failure. In The 3rd Multidisciplinary Conference on Reinforcement Learning and Decision Making. Ann Arbor, Michigan.",
    "url": "https://www.researchgate.net/profile/Falk-Lieder/publication/314257973_Learning_to_misallocate_control_maltransfer_can_lead_to_self-control_failure/links/58be407792851c471d5c0451/Learning-to-misallocate-control-maltransfer-can-lead-to-self-control-failure.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745871382153",
    "title": "Controlled vs. Automatic Processing: A Graph-Theoretic Approach to the Analysis of Serial vs. Parallel Processing in Neural Network Architectures",
    "journal": "Proceedings of the 38th Annual Meeting of the Cognitive Science Society",
    "year": 2016,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Dey, B.",
      "Ozcimder, K.",
      "Patwary, M.",
      "Willke, T.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Dey, B., Ozcimder, K., Patwary, M., Willke, T., & Cohen, J. D. (2016). Controlled vs. automatic processing: A graph-theoretic approach to the analysis of serial vs. parallel processing in neural network architectures. In Proceedings of the Annual Meeting of the Cognitive Science Society (pp. 1547 – 1552).",
    "url": "https://escholarship.org/content/qt8gf7361v/qt8gf7361v_noSplash_9269203c7e193b96450cbd5278a264af.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  },
  {
    "id": "pub-1745871598790",
    "title": "A Computational Model of Control Allocation based on the Expected Value of Control",
    "journal": "Reinforcement Learning and Decision Making Conference 2015",
    "year": 2015,
    "type": "conference proceeding",
    "authors": [
      "Musslick, S.",
      "Shenhav, A.",
      "Botvinick, M. M.",
      "Cohen, J. D."
    ],
    "citation": "Musslick, S., Shenhav, A., Botvinick, M. M., & Cohen, J. D. (2015, June). A computational model of control allocation based on the expected value of control. In Reinforcement Learning and Decision Making Conference (Vol. 2015).",
    "url": "https://www.shenhavlab.org/s/MusslickEtAl_RLDM2015.pdf",
    "projectIds": [
      "project-1744383751212"
    ],
    "projectId": "project-1744383751212"
  }
];
