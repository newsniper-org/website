import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "NEWSNIPER",
  DESCRIPTION: "NEWSNIPER 공식 사이트입니다.",
  EMAIL: "newsniper@protonmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "NEWSNIPER 메인 페이지",
  DESCRIPTION: "NEWSNIPER 메인 사이트의 인덱스 페이지입니다.",
};

export const ARTICLES: Metadata = {
  TITLE: "게시물",
  DESCRIPTION:
    "기사/영상 등 컨텐츠들",
};

export const SERIES: Metadata = {
  TITLE: "Series",
  DESCRIPTION:
    "연재 기획",
};

export const SOCIALS: Socials = [
  {
    NAME: "YouTube",
    HREF: "https://www.youtube.com/@newsniper_ybi",
  },
  {
    NAME: "Instagram",
    HREF: "https://www.instagram.com/newsniper_ybi",
  }
];
