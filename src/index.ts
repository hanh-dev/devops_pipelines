import express, { Express } from 'express';
import 'dotenv/config';
import authRoutes from './features/auth/auth.route';
import { errorHandler } from './middleware/error-handler';
import todoRoutes from './features/todo/todo.route';
const app: Express = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todos', todoRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on <http://localhost:${PORT}> 🚀`);
});
