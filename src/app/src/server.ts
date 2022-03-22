import 'express-async-errors';
import '../../lib/moduleAlias';

import express, {
  Application,
  Request,
  Response,
} from 'express';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import methodOverride from 'method-override';

import routes from '@app/routes/controllers';

import errorHandler from '@middlewares/error-handler';

import BusinessError from '@utilities/errors/business';
import ForbiddenError from '@utilities/errors/forbidden';
import UnauthorizedError from '@utilities/errors/unauthorized';

const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json();
});

// Handle 500
// do not remove next from line bellow, error handle will not work
// eslint-disable-next-line no-unused-vars
app.use((
  err: BusinessError | ForbiddenError | UnauthorizedError | Error,
  req: Request,
  res: Response,
) => {
  errorHandler(err, req, res);
});

export default app;
