export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

export interface MessaageBoxProps {
  sender: string;
  message: string;
}

export interface DiscussionCardProps {
  discussion: Discussion;
  session: SessionObject;
  categories: string[];
}

export type SessionObject = {
  userId: string;
  exp: number;
  iat?: number;
};

export type Reply = {
  id: string;
  createdAt: string;
  body: string;
  dicussionId: string;
  posterId: string;
  parentId?: string;
  poster: User;
  discussion: Discussion;
  replies: Reply[];
  parent?: Reply;
};

export type DiscussionReply = {
  id: string;
  body: string;
  poster: User;
  createdAt: Date;
  discussion: Discussion;
  dicussionId: string;
  session: SessionObject;
  onDeleteReply?: (id: string) => void;
  onAddReply?: (reply: string, replyId?: string) => void;
};

export interface DiscussionOpenerProps {
  session: SessionObject | any;
  discussion: Discussion;
  onAddReply?: (reply: string) => void;
}

export type Discussion = {
  id: string;
  title: string;
  body: string;
  category: string;
  views: number;
  replies: number;
  posterId: string;
  poster: User;
};

export type LoginFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CreateReplyFields = {
  body: string;
  discussionId: string;
  posterId: string;
  replyId?: string;
};

export type CourseFields = {
  subject: string;
  code: number;
  title: string;
};

export type RoomFields = {
  name: string;
  description?: string;
  courseId: string;
  creatorId: string;
  subject: string;
  code: number;
};
