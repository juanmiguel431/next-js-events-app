import { ObjectId, Document } from "mongodb";

export interface InvalidRequestResponse {
  message: string;
}

export interface PostResponse {
  message: string;
  comment: Comment;
}

export interface GetResponse {
  comments?: Comment[];
}

export interface RequestBody {
  email?: string;
  name?: string;
  text?: string;
}

export interface Comment extends Document {
  _id?: ObjectId;
  email: string;
  name: string;
  text: string;
  eventId: string;
}
