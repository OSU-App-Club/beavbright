export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  category: string;
  replies: number;
  views: number;
  posterId: string;
  poster: User;
}

export interface DiscussionCardProps {
  discussion: Discussion;
  session: SessionObject;
  categories: string[];
}

type SessionObject = {
  userId: string;
  exp: number;
};

export interface DiscussionReplyProps {
  name: string;
  avatar: string;
  origin: string;
  content: string;
  date: string;
}

export interface DiscussionOpenerProps {
  name: string;
  avatar: string;
  content: string;
  category: string;
  replies: number;
  views: number;
}
