import React from "react";

import { Clock } from "@/components/icons/Clock";
import { FileText2 } from "@/components/icons/FileText2";
import { Home } from "@/components/icons/Home";
import { Link } from "@/components/icons/Link";
import { IconProps } from "@/components/icons/types";
import { User } from "@/components/icons/User";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<IconProps>;
  keywords?: string[];
  isActive?: (pathname: string) => boolean;
  section?: "main" | "projects";
}

export const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: Home,
    keywords: ["home"],
    isActive: (pathname) => pathname === "/",
    section: "main",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: User,
    keywords: ["about", "work", "jobs", "experience", "projects"],
    isActive: (pathname) => pathname.startsWith("/about"),
    section: "main",
  },
  {
    id: "timeline",
    label: "Timeline",
    href: "/timeline",
    icon: Clock,
    keywords: ["timeline", "history", "years"],
    isActive: (pathname) => pathname.startsWith("/timeline"),
    section: "main",
  },
  {
    id: "writing",
    label: "Writing",
    href: "/writing",
    icon: FileText2,
    keywords: ["writing", "blog", "posts"],
    isActive: (pathname) => pathname.startsWith("/writing"),
    section: "main",
  },
  {
    id: "links",
    label: "Links",
    href: "/links",
    icon: Link,
    keywords: ["links", "profiles", "social"],
    isActive: (pathname) => pathname.startsWith("/links"),
    section: "main",
  },
];

// Helper functions to filter navigation items
export const getMainNavigationItems = () =>
  navigationItems.filter((item) => item.section === "main");

export const getProjectNavigationItems = () =>
  navigationItems.filter((item) => item.section === "projects");

export const getAllNavigationItems = () => navigationItems;
