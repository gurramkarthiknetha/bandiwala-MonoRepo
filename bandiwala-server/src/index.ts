import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, world!');
  });
  

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
