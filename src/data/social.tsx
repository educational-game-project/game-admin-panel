import {
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import type { SocialData } from "../types";

const socials: SocialData[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/sningrat_",
    icon: <InstagramIcon color="#e1306c" />,
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://twitter.com/sningrat_",
    icon: <TwitterIcon color="#1DA1F2" />,
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/iwansuryaningrat",
    icon: <GithubIcon />,
  },
  {
    id: "website",
    name: "Website",
    url: "https://iwansuryaningrat.tech",
    icon: <GlobeIcon color="#ff0000" />,
  },
  {
    id: "linkedin",
    name: "Linkedin",
    url: "https://www.linkedin.com/in/iwan-suryaningrat/",
    icon: <LinkedinIcon />,
  },
];

export default socials;
