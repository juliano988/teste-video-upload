// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const fileName = JSON.parse(req.body).fileName;
  const chunk = JSON.parse(req.body).chunk;
  const total = JSON.parse(req.body).total;
  const file = JSON.parse(req.body).file;

  if (!fs.existsSync('./' + fileName)) {
    fs.mkdirSync('./' + fileName)
  }

  fs.writeFile('./' + fileName + '/' + fileName + chunk, file, { encoding: 'base64' }, function (err) {
    if (err) return console.log(err);

    if (chunk === total) {

      for (let i = 1; i <= total; i++) {

        fs.appendFileSync('./' + fileName + '/' + fileName, fs.readFileSync('./' + fileName + '/' + fileName + i));

      }

    }

    res.status(200).json({ name: 'John Doe' })

  });

}
