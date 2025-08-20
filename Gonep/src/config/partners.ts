export interface Partner {
  name: string;
  logo: string;
  hasLogo: boolean;
  website?: string;
  description?: string;
}

export const partners: Partner[] = [
  {
    name: "Microsoft Founders Hub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    hasLogo: true,
    website: "https://foundershub.microsoft.com/",
    description: "Microsoft's global program supporting early-stage startups"
  },
  {
    name: "Chandaria Innovation Centre",
    logo: "https://iiuil.ku.ac.ke/images/2024/logoiiuil.png",
    hasLogo: true,
    website: "https://iiuil.ku.ac.ke/",
    description: "University of Nairobi's innovation and entrepreneurship hub"
  },
  {
    name: "Kenya Innovation Agency",
    logo: "https://www.innovationagency.go.ke/assets/new/images/logo/kenialogo2.png",
    hasLogo: true,
    website: "https://www.innovationagency.go.ke/",
    description: "Government agency promoting innovation and entrepreneurship"
  },
  {
    name: "Kenyatta University",
    logo: "https://www.ku.ac.ke/images/kunew6-3.png",
    hasLogo: true,
    website: "https://www.ku.ac.ke/",
    description: "Leading Kenyan university supporting research and innovation"
  }, 
  {
    name: "KEPSA",
    logo: "https://www.kepsa.or.ke/kepsa.png",
    hasLogo: true,
    website: "https://www.kepsa.or.ke/",
    description: "leading umbrella organization representing the private sector in Kenya."
  }
];
