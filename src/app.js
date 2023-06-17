/* eslint-disable no-console */
import express from 'express';
import 'dotenv/config';

// router
import userRouter from './routes/users.js';

// middleware
import errorMiddleware from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use(userRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
