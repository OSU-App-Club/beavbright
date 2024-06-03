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

export type RoomData = {
  name: string;
  description: string;
};

export type RoomResponse = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  customer_id: string;
  app_id: string;
  recording_info: {
    enabled: boolean;
  };
  template_id: string;
  template: string;
  region: string;
  created_at: string;
  updated_at: string;
};

export type RoomCreateError = {
  code: number;
  message: string;
  details: string[];
};

export type HmsRoom = {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  customer_id: string;
  recording_source_template: boolean;
  template_id: string;
  template: string;
  region: string;
  created_at: string;
  key: string;
  updated_at: string;
  large_room: boolean;
  max_duration_seconds: number;
  recording?: {
    enabled: boolean;
  };
  size?: number;
  codes?: RoomCode[];
};

export interface RoomCardProps {
  room: HmsRoom;
}

export type RoomCode = {
  code: string;
  room_id: string;
  role: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
};

export type ListRoomsResponse = {
  limit: number;
  data: HmsRoom[];
  last: string;
};
