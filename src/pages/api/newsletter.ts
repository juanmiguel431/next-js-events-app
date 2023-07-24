import type { NextApiRequest, NextApiResponse } from 'next'
import MongoDbClient from '@/apis/mongodb';

type Data = {
  message: string
}

export interface RequestBody {
  email: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const body = req.body as RequestBody;

    if (!body.email || !body.email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. '});
      return;
    }

    const client = new MongoDbClient('emails');
    try {
      await client.connect();
      await client.insert({ email: body.email });
    } finally {
      await client.close();
    }

    res.status(201).json({ message: 'Signed up' })
  } else {
    res.status(400);
  }
}
