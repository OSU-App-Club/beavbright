export const sidebarNavItems = [
  {
    title: "Courses",
    href: "/platform/courses",
  },
  {
    title: "Study Groups",
    href: "/platform/admin/problems",
  },
  {
    title: "Discussions",
    href: "/platform/discussions",
  },
];

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

export const platformRoutes: RouteProps[] = [
  {
    href: "/course-materials",
    label: "Course Materials",
  },
  {
    href: "/study-groups",
    label: "Study Groups",
  },
  {
    href: "/discussions",
    label: "Discussions",
  },
  {
    href: "/profile",
    label: "Profile",
  },
  {
    href: "/login",
    label: "Login",
  },
  {
    href: "/register",
    label: "Register",
  },
];
