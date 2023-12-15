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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;
