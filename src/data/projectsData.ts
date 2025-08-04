// projectsData.ts
import netflix from "@/assets/images/Netflix.jpg";
import flavorhaven from "@/assets/images/flavorhaven.png";
import yola from "@/assets/images/yola.png";
import wanderlust from "@/assets/images/wanderlust.png";

export const projects = [
  {
    name: "Netflix Clone",
    slug: "netflix-clone",
    image: netflix,
    description:
      "A Netflix UI clone that mimics the look and feel of the original platform. It uses REST APIs to dynamically fetch and display movies by category.",
    techStack: ["React", "CSS", "TMDB API", "Lenis"],
    siteUrl: "https://nettfliixx-clone.netlify.app/",
  },
  {
    name: "Flavor Haven",
    slug: "flavor-haven",
    image: flavorhaven,
    description:
      "A modern and fully responsive restaurant website that offers an engaging user experience with features like online menu browsing, and food delivery options.",
    techStack: ["React", "Bootstrap", "Redux", "Rest API"],
    siteUrl: "https://flavorhaaven.netlify.app/",
  },
  {
    name: "Yola",
    slug: "yola-ecommerce",
    image: yola,
    description:
      "A fashion eCommerce UI featuring a home page, product listing, cart, and checkout flow. Built for a smooth and modern shopping experience without backend functionality.",
    techStack: ["React", "TypeScript", "Redux", "Bootstrap"],
    siteUrl: "https://yola-ecommerce.netlify.app/",
  },
  {
    name: "Wanderlust",
    slug: "wanderlust",
    image: wanderlust,
    description:
      "A travel exploration website UI showcasing beautiful destinations with interactive previews. Built for travel enthusiasts to browse and get inspired, with no backend functionality.",
    techStack: ["React", "CSS"],
    siteUrl: "https://athul-wanderlust.netlify.app/",
  },
];
