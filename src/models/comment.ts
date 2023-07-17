
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

export interface Comment {
  id: string;
  email: string;
  name: string;
  text: string;
}
