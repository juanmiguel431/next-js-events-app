import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export interface RequestBody {
  email: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const body = req.body as RequestBody;

    if (!body.email || !body.email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address. '});
      return;
    }

    res.status(201).json({ message: 'Signed up' })
  } else {
    res.status(400);
  }
}
