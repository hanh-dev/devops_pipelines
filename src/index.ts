import express, { Express, Request, Response } from "express";
import "dotenv/config";
const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/users', (req: Request, res: Response) => {
    return res.json({
        message: "successfully!"
    })
});

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});