import express from 'express';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import usersRoutes from './routes/usersRoutes';
import operationsRoutes from './routes/operationsRoute';
import operationsRequestRoutes from './routes/operationsRequestRoutes';

const app = express();
app.use(bodyParser.json());

app.use(usersRoutes);
app.use(operationsRoutes);
app.use(operationsRequestRoutes);

app.use((err, req, res, _) => {
  if (err.error) {
    res.status(err.error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ ...err });
  } else if (err.status) {
    res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message || err.cod,
      },
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
  }
});

app.get('/health', (req, res) => {
  res.send('Up and runnning');
});

export default app;
