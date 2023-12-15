import 'dotenv/config';
import path from 'path';
import express from 'express';
const app = express();
import cors from 'cors';
import crypto from 'crypto';
import querystring from 'querystring';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';

// allows the usage of __dirname as it's not supported in es6 modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// configuration for backend
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: 'http://localhost:8080'}));
app.use(cookieParser());

// define PORT server will listen to
const PORT = 8080;

// server static files
app.use(express.static(path.join(__dirname, '../src/assets')));

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'an error occured'},
  };
  //Object.assign will create an object with the defaultErr object and replace anything with the given err returned from the middleware we invoke. IE. log, status, message.
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.sendStatus(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
