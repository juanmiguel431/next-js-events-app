import { v4 as uuidv4 } from 'uuid';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetResponse, InvalidRequestResponse, PostResponse, RequestBody, Comment } from '@/models/comment';
import MongoDbClient from '@/apis/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(
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
      email: email,
      name: name,
      text: text,
      eventId: eventId
    }

    const client = new MongoDbClient('comments');
    try {
      await client.connect();
      const result = await client.insert(newComment);
      newComment._id = result.insertedId;
    } finally {
      await client.close();
    }

    res.status(201).json({ message: 'Added Comment.', comment: newComment });
  } else if (req.method === 'GET' ) {

    let comments: Comment[];
    const client = new MongoDbClient('comments');
    try {
      await client.connect();
      const result = await client.findAll();
      comments = await result.sort({ _id: -1 }).toArray();
    } finally {
      await client.close();
    }

    res.status(200).json( { comments: comments });
  } else {
    res.status(400);
  }
}
