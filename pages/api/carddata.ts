import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get('https://marvelsnap.inven.co.kr/db/card');
    const names = data
      .match(/<span class="card-name">(.+?)<\/span>/g)
      .map((match : any) => match.replace(/<.+?>/g, ''));
    res.status(200).json({ names });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
