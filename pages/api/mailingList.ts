import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      await axios.put(
        'https://api.sendgrid.com/v3/marketing/contacts',
        {
          contacts: [{ email: req.body.mail }],
          list_ids: [process.env.SENDGRID_MAILING_ID],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SENDGRID_SECRET}`,
          },
        }
      );

      res.status(200).json({
        message: 'Your email has been successfully added to the mailing list. Welcome 👋',
      });
    } catch {
      // No need for `err` here
      res.status(500).json({
        message: 'Oops, there was a problem with your subscription, please try again or contact us.',
      });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
