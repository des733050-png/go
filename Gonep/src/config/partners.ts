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
    logo: "",
    hasLogo: false,
    website: "https://chandaria.uonbi.ac.ke/",
    description: "University of Nairobi's innovation and entrepreneurship hub"
  },
  {
    name: "Kenya Innovation Agency",
    logo: "",
    hasLogo: false,
    website: "https://keniainvest.org/",
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
    name: "SEKU",
    logo: "https://www.seku.ac.ke/images/Logo/seku_logo.jpg",
    hasLogo: true,
    website: "https://www.seku.ac.ke/",
    description: "Leading Kenyan university supporting research and innovation"
  }
];
