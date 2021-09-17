import { VercelRequest, VercelResponse } from '@vercel/node';
import ytpl from 'ytpl';

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if(req.method === 'POST') {
    const { url } = req.body;
    if(!ytpl.validateID(url)) {
      res.statusCode = 500;
      res.send("Invalid url");
      return
    }
    const videos = await ytpl(url, { pages: Infinity });

    res.json({  urls: videos.items.map(val => val.shortUrl) })
  } else {
    res.statusCode = 500;
    res.send("Invalid method");
  }
}
