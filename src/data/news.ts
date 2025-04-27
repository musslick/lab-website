export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl?: string;
  tags?: string[];
  featured?: boolean;
  emojiHexcodes?: string[]; // Support for OpenMoji hexcodes
}

export const newsItems: NewsItem[] = [
  {
    "id": "news-1",
    "title": "DFG Grant Award: Toward an integrative understanding of the flexibility-stability-balance",
    "content": "Our laboratory together with the laboratory of Gesine Dreisbach (Regensburg University) got awarded a DFG grant on the topic \"Toward an integrative understanding of the flexibility-stability-balance and its underlying mechanisms via computational modeling and behavioral experimentation\", amounting to a total support of 438.000 Euro.\n\nIn this grant, we will use a combination of dynamical systems modeling and behavioral experimentation to better understand the mechanisms that underlie the regulation of cognitive stability and flexibility in human task switching.\n\nWe are excited for the opportunity to collaborate on this grant with the laboratory of Gesine Dreisbach who will conduct behavioral experiments that provide the empirical foundation for computational models of cognitive stability and flexibility.",
    "date": "2025-03-11",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "funding",
      "cognitive control",
      "computational modeling"
    ],
    "imageUrl": "https://www.uni-bonn.de/de/forschung-lehre/forschungsprofil/transdisziplinaere-forschungsbereiche/tra-4-individuals/programme/german-research-foundation/logo-dfg.jpg/@@images/image/leadimagesize"
  },
  {
    "id": "news-2",
    "title": "Grant Award: Workshop on Automated Scientific Discovery of Mind and Brain",
    "content": "We are fortunate to have received support from Lower Saxony's Ministry of Science and Culture for a workshop on “AI for Discovery of Mind and Brain” (PROFIL International, MWK, 28.204 Euro) for hosting a Workshop at Princeton University together with our collaborators there, Younes Strittmatter and Jonathan D. Cohen.\n\nThis workshop will host a series of tutorials on open-software scientific software for automating scientific discovery in cognitive science, and present cutting-edge research on AI for cognitive science and automated scientific discovery.\n\nStay tuned for more details!",
    "date": "2025-04-11",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "AI for science",
      "automated scientific discovery",
      "workshop",
      "hackathon",
      "funding"
    ],
    "emojiHexcodes": [
      "1F91D"
    ]
  },
  {
    "id": "news-3",
    "title": "Moritz Hartstang joining the lab as PhD student",
    "content": "We're excited to welcome Moritz Hartstang as a doctoral student to our lab. Moritz has a background in Design and Cognitive Science and will be focusing on automated systems to adapt medical and scientific texts to a person's growing comprehension.",
    "date": "2025-04-03",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "team update"
    ],
    "imageUrl": "https://i.postimg.cc/NfR4FFXr/Moritz.jpg"
  },
  {
    "id": "news-1745330308816",
    "title": "Automated Research Assistant presented at Interdisciplinary Science Summit",
    "content": "Our Automated Research Assistant (AutoRA) was featured in a live demo at the Interdisciplinary Science Summit in Toronto, an event organized by Schmidt Science Fellows. At the summit, we showcased how AutoRA can discover models of human human learning in closed-loop experiments.",
    "date": "2024-07-17",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [],
    "imageUrl": "https://i.postimg.cc/W46skZ2f/bb-media-photos-popup-image-2.jpg"
  },
  {
    "id": "news-1745333860298",
    "title": "Hackathon at German Research Center for AI",
    "content": "Together with the Autonomous Empirical Research Group, our lab hosted a hackathon at the  German Research Center for AI in Osnabrück, Germany. The goal of the hackathon was to develop integrated scientific discovery systems capable of discovering new models of human learning. ",
    "date": "2025-01-24",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "AI for science",
      "automated scientific discovery",
      "hackathon"
    ],
    "imageUrl": "https://i.postimg.cc/MZ3mcy7s/dfki-hackathon.jpg"
  },
  {
    "id": "news-1745334035309",
    "title": "Computational Modeling Workshop at Brown University",
    "content": "Our lab co-organized Computational Modeling Workshop at held at the Carney Institute for Brain Science at Brown University. The workshop enabled students of Osnabrück University and other institutions to learn about basic and advanced methods in computational modeling. Students travel grants were supported by the Institute of Cognitive Science and the Universitätsgesellschaft of Osnabrück University.",
    "date": "2024-07-12",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "computational modeling",
      "workshop"
    ],
    "imageUrl": "https://i.postimg.cc/zvDN4stk/brown-workshop.jpg"
  },
  {
    "id": "news-1745765607888",
    "title": "New Visiting PhD Student from NTU Singapore: Priyadharshini Santhanakrishnan ",
    "content": "We welcome Priyadharshini Santhanakrishnan to the lab, who is a visiting PhD student from Nanyang Technological University where she works with Victoria Leong from the Early Mental Potential & Wellbeing Research Centre (EMPOWER).  studies how, in mother – infant dyadic contexts, maternal behaviour influences infants’ attention allocation and consequently their learning.  In our lab, Priya will apply automated model discovery techniques to uncover hidden cognitive dynamics of mother – infant interactions based on EEG and behavioral data.",
    "date": "2025-03-03",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "team update"
    ],
    "imageUrl": "https://i.postimg.cc/yYtstF3Q/Priya.jpg"
  },
  {
    "id": "news-1745765977905",
    "title": "Alessandra Brondetta joining the lab as PhD student",
    "content": "We are excited to welcome Alessandra Brondetta to the lab! Alessandra has a background in the physics of complex systems and will be joining our lab to study the mechanisms of cognitive flexibility. Her work addresses how diversity in cognitive mechanisms among individuals can facilitate cognitive and belief flexibility at the group level.",
    "date": "2024-01-09",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "team update"
    ],
    "imageUrl": "https://i.postimg.cc/Nj03bL0s/Alessandra-Brondetta.jpg"
  },
  {
    "id": "news-1745766151086",
    "title": "Sedighe Raeisi joining the lab as Humboldt Fellow",
    "content": "We are excited to welcome Sedighe Raeisi who will be joining the lab as postdoctoral Humboldt Fellow. Sedighe obtained her PhD in physics and will be developing novel statistical methods for the automated discovery of individual differences in cognitive mechanisms.",
    "date": "2024-04-01",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "team update"
    ],
    "imageUrl": "https://i.postimg.cc/L8z1C4QW/Sedighe.jpg"
  },
  {
    "id": "news-1745768023319",
    "title": "Teaching Collaboration with SlashWhy on LLMs for Science",
    "content": "Our lab started a collaboration between SlashWhy and our study course \"LLMs for Science\", which is co-taught by researchers at the German Research Center for Artificial Intelligence. SlashWhy provide our students with insights into user experience research when it comes to developing LLM-based tools for science. ",
    "date": "2025-04-04",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "teaching",
      "collaboration"
    ],
    "imageUrl": "https://i.postimg.cc/3xTMp7y1/slashwhy1.jpg"
  },
  {
    "id": "news-1745768945020",
    "title": "AutoRA interacts with humans at UOS open house",
    "content": "We premiered a physical exhibit of AutoRA at the Open House at Osnabrück University. The exhibit autonomously performed studies with participants, studying their learning behavior, and provided them with explanations about what it learned.",
    "date": "2024-10-26",
    "author": "Sebastian Musslick",
    "featured": false,
    "tags": [
      "AI for science",
      "automated scientific discovery"
    ],
    "imageUrl": "https://i.postimg.cc/Lsj3PK1t/tag-der-offenen-tuer.jpg"
  }
];
