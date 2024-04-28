export interface User {
  name: string;
  avatar: string;
}

export interface DiscussionCardProps {
  title: string;
  content: string;
  category: string;
  replies: number;
  views: number;
  poster: User;
}

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
