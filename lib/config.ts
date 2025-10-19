export interface FooterItem {
  name: string;
  link: string;
}

export interface FooterGroup {
  title: string;
  content: FooterItem[];
}

export interface SocialItem {
  portal: string;
  name: string;
  link: string;
  icon: string;
  color: string;
}

export interface MenuItem {
  text: string;
  link: string;
  dropdown?: MenuItem[];
}

export interface BannerConfig {
  top: boolean;
  sidebar: boolean;
  topLink: string;
  sidebarLink: string;
}

export interface RecommendationConfig {
  limit: number;
  posts: string[];
}

export interface SiteConfig {
  disqusUrl: string;
  mainMenu: MenuItem[];
  social: SocialItem[];
  footer: FooterGroup[];
}

export const siteConfig: SiteConfig = {
  disqusUrl: "https://redark.pl",
  mainMenu: [
    { text: "Aktualności", link: "/" },
    { text: "Projekty DIY", link: "/category/diy" },
    { text: "Składanie PC", link: "/skladanie-pc" },
    { text: "Diagnostyka", link: "/category/diagnostyka" },
    { text: "Podzespoły i urządzenia", link: "/podzespoly-i-urzadzenia" },
    { text: "Blog", link: "/blog" },
    { text: "Kontakt", link: "/kontakt" },
    { text: "Szukaj", link: "/szukaj" },
  ],
  social: [
    {
      portal: "Facebook",
      name: "Facebook (redarkpl)",
      link: "https://www.facebook.com/redarkpl",
      icon: "fb",
      color: "#3b5999",
    },
    {
      portal: "Instagram",
      name: "Instagram (redark.pl)",
      link: "https://www.instagram.com/redark.pl/",
      icon: "ig",
      color: "#e44459",
    },
    {
      portal: "Threads",
      name: "Threads (redark.pl)",
      link: "https://www.threads.net/@redark.pl",
      icon: "th",
      color: "#ababab",
    },
    {
      portal: "X/Twitter",
      name: "X/Twitter (REDARKpl)",
      link: "https://x.com/REDARKpl",
      icon: "tt",
      color: "#5f5f5f",
    },
    {
      portal: "YouTube",
      name: "YouTube (REDARKpl)",
      link: "https://www.youtube.com/@redarkpl",
      icon: "yt",
      color: "#ff0000",
    },
  ],
  footer: [
    {
      title: "O serwisie",
      content: [
        { name: "Regulamin witryny", link: "/regulamin-witryny" },
        { name: "Polityka prywatności", link: "/polityka-prywatnosci" },
        { name: "Kontakt", link: "/kontakt" },
      ],
    },
    {
      title: "Na skróty",
      content: [
        { name: "Poradnik składania PC", link: "/skladanie-pc" },
        {
          name: "Dobieranie podzespołów",
          link: "/podzespoly-i-urzadzenia",
        },
        { name: "Lista aktywnych serii artykułów", link: "/serie" },
        { name: "Wszystkie artykuły", link: "/blog" },
      ],
    },
  ],
};
