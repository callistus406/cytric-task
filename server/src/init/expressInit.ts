import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import routes from '../routes';
import { handleCustomError } from '../middlewares/customErrorHandler';
const app = express();
function setupExpress() {
  app.disable('x-powered-by');
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(express.json({ limit: '50mb' }));
  app.use(cors({ origin: '*', credentials: true }));
  app.use(express.static(path.join(__dirname, '../public')));

  console.log(process.env.PORT);
  const port = normalizePort(process.env.PORT || '5001');

  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
  app.use('/api/v1', routes);
  app.use(handleCustomError);

  app.listen(port, () => {
    console.log(`Express start listening to port: ${port.toString()}`);
  });

  return app;
}

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export default setupExpress;
