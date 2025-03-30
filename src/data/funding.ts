export interface FundingSource {
  id: string;
  name: string;
  url: string;
  logo?: string;
  grantNumber?: string;
  amount?: string;
  duration?: string;
}

export const fundingSources: FundingSource[] = [
  {
    id: "nsf-grant",
    name: "National Science Foundation",
    url: "https://www.nsf.gov",
    grantNumber: "NSF-1234567"
  },
  {
    id: "nih-grant",
    name: "National Institutes of Health",
    url: "https://www.nih.gov",
    grantNumber: "NIH-R01-AB123456"
  },
  {
    id: "research-foundation",
    name: "Science Research Foundation",
    url: "https://www.example.org/srf"
  }
];
