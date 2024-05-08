/*
model User {
  id          String       @id @default(cuid())
  createdAt   DateTime     @default(now())
  firstName   String
  lastName    String
  email       String       @unique
  password    String
  avatar      String
  lastLogin   DateTime?
  Discussion  Discussion[]
  Reply       Reply[]
}

model Discussion {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  replies     Int      @default(0)
  views       Int      @default(0)
  title       String
  body        String
  category    String
  posterId    String
  poster      User     @relation(fields: [posterId], references: [id])
  Reply       Reply[]
}

model Reply {
  id           String     @id @default(cuid())
  createdAt    DateTime   @default(now())
  body         String
  discussionId String     @map("discussionId")
  posterId     String     @map("posterId")
  discussion   Discussion @relation(fields: [discussionId], references: [id])
  poster       User       @relation(fields: [posterId], references: [id])
}
*/

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
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
