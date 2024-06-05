import { SchoolIcon } from "lucide-react";
import { Icons } from "../../components/icons";

export const directoryRoutes = {
  infosNav: [
    {
      title: "Directory",
      items: [
        {
          title: "Your Courses",
          href: "/platform/courses",
          description: "View your courses.",
        },
        {
          title: "Study Groups",
          href: "/platform/study-groups",
          description: "Check out the upcoming contests.",
        },
        {
          title: "Discussions",
          href: "/platform/discussions",
          description: "Join the discussion.",
        },
      ],
    },
  ],
};

interface RouteProps {
  href: string;
  label: string;
}

export const routeList: RouteProps[] = [
  {
    href: "/#home",
    label: "Home",
  },
  {
    href: "/#about",
    label: "About",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

export const breadcrumbs: RouteProps[] = [
  { href: "/platform", label: "Home" },
  { href: "/platform/discussions", label: "Discussions" },
  { href: "/platform/discussions/1", label: "CS 161 Final" },
];

export const defaultCategories: string[] = [
  "General",
  "Computer Science",
  "Study Groups",
  "Math",
  "Physics",
  "Biology",
  "Chemistry",
  "Business",
  "Engineering",
  "Health",
  "Humanities",
  "Social Sciences",
  "Events",
];

const Users = Icons.users;
const ListIcon = Icons.list;
const BookIcon = Icons.book;
const User2Icon = Icons.user2;
const LogOutIcon = Icons.logOut;
const HomeIcon = Icons.home;

export const sidebarNavItems = [
  {
    title: "Home",
    href: "/platform",
    icon: <HomeIcon size={24} />,
  },
  {
    title: "Courses",
    href: "/platform/courses",
    icon: <SchoolIcon size={24} />,
  },
  {
    title: "Course Materials",
    href: "/platform/course-materials",
    icon: <BookIcon size={24} />,
  },
  {
    title: "Discussions",
    href: "/platform/discussions",
    icon: <ListIcon size={24} />,
  },
  {
    title: "Study Groups",
    href: "/platform/study-groups",
    icon: <Users size={24} />,
  },
  {
    title: "Profile",
    href: "/platform/profile",
    icon: <User2Icon size={24} />,
  },
  {
    title: "Sign Out",
    href: "/logout",
    icon: <LogOutIcon size={24} />,
  },
];
