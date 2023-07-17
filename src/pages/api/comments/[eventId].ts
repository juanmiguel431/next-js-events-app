import type { NextApiRequest, NextApiResponse } from 'next'
import { GetResponse, InvalidRequestResponse, PostResponse, RequestBody, Comment } from '@/models/comment';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvalidRequestResponse | PostResponse | GetResponse>
) {

  const eventId = req.query.eventId as string;

  if (req.method === 'POST') {
    const { email, name, text } = req.body as RequestBody;
    if (!email?.includes('@') || !name?.trim() || !text?.trim()) {
      res.status(422).json({ message: 'Invalid input '});
      return;
    }

    const newComment: Comment = {
      id: new Date().toISOString(),
      email: email,
      name: name,
      text: text
    }

    res.status(201).json({ message: 'Added Comment.', comment: newComment });
  } else if (req.method === 'GET' ) {
    const dummyCommentList: Comment[] = [
      { id: 'c1', name: 'Juan', text: 'A first comment', email: 'juan@gmail.com' },
      { id: 'c2', name: 'Manuel', text: 'A second comment', email: 'manuel@gmail.com' },
    ];

    res.status(200).json( { comments: dummyCommentList });
  } else {
    res.status(400);
  }
}
