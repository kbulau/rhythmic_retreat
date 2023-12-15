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
app.use(cors({origin: 'http://localhost:5173'}));
app.use(cookieParser());

// define PORT server will listen to
const PORT = 8080;

// server static files
app.use(express.static(path.join(__dirname, '../src/assets')));

// variables required for spotify OAuth
const stateKey = 'spotify_auth_state';
const redirect_uri = 'http://localhost:5173/api/callback';
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// generate random string for state to make it secure when requesting from spotify per guidelines
const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString('hex').slice(0, length);
};

// redirect to spotify to get authorizaton from user
app.get('/api/token', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope = 'user-top-read';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

//gets access token from spotify to access their api
app.get('/api/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  console.log(state);
  console.log(req.cookies[stateKey]);
  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);

    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(client_id + ':' + client_secret).toString('base64'),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      }),
    };

    try {
      const authResponse = await fetch(
        'https://accounts.spotify.com/api/token',
        authOptions
      );
      const authData = await authResponse.json();

      if (!authResponse.ok) {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
        return;
      }

      const access_token = authData.access_token;
      const refresh_token = authData.refresh_token;

      const userOptions = {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      };
      res.cookie('accToken', access_token, {
        maxAge: 60 * 1000,
      });
      res.cookie('refToken', refresh_token);
      // use the access token to access the Spotify Web API
      const userResponse = await fetch(
        'https://api.spotify.com/v1/me',
        userOptions
      );
      const userData = await userResponse.json();

      console.log(userData);
      res.redirect('/home');
      // we can also pass the token to the browser to make requests from there
      // res.redirect(
      //   '/#' +
      //     querystring.stringify({
      //       access_token: access_token,
      //       refresh_token: refresh_token,
      //     })
      // );
    } catch (error) {
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'invalid_token',
          })
      );
    }
  }
});

// middleware to check if access token is still valid
const accTokenRefresh = async (req, res, next) => {
  if (req.cookies.accToken) return next();
  else if (req.cookies.refToken) {
    const newToken = await fetch('/api/refresh_token');
    res.cookie('accToken', newToken.access_token, {
      maxAge: 60 * 1000,
    });
    res.cookie('refToken', newToken.refresh_token);
    return next();
  } else {
    return res.redirect('/api/token');
  }
};

//endpoint to automatically refresh access token
app.get('/api/refresh_token', async (req, res) => {
  const refresh_token = req.cookies.refToken;
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  };

  try {
    const authResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    );
    const authData = await authResponse.json();

    if (!authResponse.ok) {
      res.status(authResponse.status).send(authData);
      return;
    }

    const access_token = authData.access_token;
    const new_refresh_token = authData.refresh_token;

    res.send({
      access_token: access_token,
      refresh_token: new_refresh_token,
    });
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

app.get('/api/topArtists', async (req, res) => {
  const topArtists = await fetch();
});

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
