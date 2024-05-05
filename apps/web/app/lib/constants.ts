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

export const discussions = [
  {
    title: "Anyone have tips for acing the CS 161 final?",
    content:
      "I'm feeling a bit overwhelmed with the material and could use some advice on how to best prepare. Any study strategies or resources you'd recommend?",
    category: "Computer Science",
    replies: 12,
    views: 325,
    poster: {
      name: "John Doe",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  {
    title: "Need help understanding MTH 251 derivatives",
    content:
      "I'm struggling with the chain rule and product rule for derivatives. Can anyone explain these concepts in a simple way or point me to good resources?",
    category: "Mathematics",
    replies: 8,
    views: 210,
    poster: {
      name: "Sarah Adams",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  {
    title: "Best resources for improving writing skills?",
    content:
      "I'm taking WR 121 and want to improve my overall writing abilities. Any recommendations for books, online courses, or other resources that have helped you?",
    category: "English",
    replies: 15,
    views: 450,
    poster: {
      name: "Emily Garcia",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  {
    title: "BI 211 lab report formatting help",
    content:
      "I'm struggling with the formatting requirements for the BI 211 lab reports. Can anyone share some tips or examples of well-formatted reports?",
    category: "Biology",
    replies: 9,
    views: 280,
    poster: {
      name: "Jessica Wong",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  {
    title: "PH 211 practice problems and study tips",
    content:
      "I'm taking PH 211 this term and could use some advice on the best way to prepare for the exams. Any recommendations for practice problems or study strategies?",
    category: "Physics",
    replies: 17,
    views: 475,
    poster: {
      name: "Michael Rodriguez",
      avatar: "/placeholder-avatar.jpg",
    },
  },
  {
    title: "CH 231 lab report formatting guidelines",
    content:
      "I'm taking CH 231 this term and need some clarification on the formatting requirements for the lab reports. Can anyone share examples or point me to the official guidelines?",
    category: "Chemistry",
    replies: 11,
    views: 350,
    poster: {
      name: "Lily Tran",
      avatar: "/placeholder-avatar.jpg",
    },
  },
];

export const categories = [
  "Computer Science",
  "Mathematics",
  "English",
  "Biology",
  "Physics",
  "Chemistry",
];

export const replies = [
  {
    name: "Michael Rodriguez",
    avatar: "/placeholder-avatar.jpg",
    content: "Hey John, you're going to fail bro. I'm sorry.",
    origin: "Anyone have tips for acing the CS 161 final?",
    date: "1 week ago",
  },
  {
    name: "Lily Tran",
    avatar: "/placeholder-avatar.jpg",
    content:
      "Hi John, I don't have any direct experience with CS 161, but as a fellow student, I'd suggest the following: - Make sure you understand the core concepts and can apply them to different types of problems. Don't just memorize formulas or algorithms. - Practice, practice, practice! Work through as many sample problems as you can find, including ones from previous exams. - Explain the key ideas to a friend or study group. Teaching the material is a great way to solidify your own understanding. - Get enough sleep and take breaks. Burnout can really hurt your performance on the final. I hope these tips are helpful! Let me know if you have any other questions.",
    origin: "Anyone have tips for acing the CS 161 final?",
    date: "3 days ago",
  },
  {
    name: "Jessica Wong",
    avatar: "/placeholder-avatar.jpg",
    content:
      "Hi John, I took CS 161 last term and found it to be quite challenging. Here are some tips that helped me prepare for the final: - Review the lecture notes and assignments to make sure you understand the key concepts and algorithms covered in the course. - Work through practice problems and past exams to get a feel for the types of questions that might be asked. - Study in a group if possible. Explaining the material to others can help reinforce your own understanding. - Take care of yourself! Make sure to get enough sleep, eat well, and take breaks when needed. Good luck on the final!",
    origin: "Anyone have tips for acing the CS 161 final?",
    date: "2 days ago",
  },
];

export const breadcrumbs = [
  { href: "/platform", label: "Home" },
  { href: "/platform/discussions", label: "Discussions" },
  { href: "/platform/discussions/1", label: "CS 161 Final" },
];
