import {
	GithubIcon,
	InstagramIcon,
	TwitterIcon,
	YoutubeIcon,
} from "lucide-react";
import type { SocialData } from "../types";

const socials: SocialData[] = [
	{
		id: "instagram",
		name: "Instagram",
		url: "https://instagram.com/",
		icon: <InstagramIcon color="#e1306c" />,
	},
	{
		id: "twitter",
		name: "Twitter",
		url: "https://twitter.com/",
		icon: <TwitterIcon color="#1DA1F2" />,
	},
	{
		id: "github",
		name: "GitHub",
		url: "https://github.com/",
		icon: <GithubIcon />,
	},
	{
		id: "youtube",
		name: "YouTube",
		url: "https://www.youtube.com/",
		icon: <YoutubeIcon color="#ff0000" />,
	},
];

export default socials;
