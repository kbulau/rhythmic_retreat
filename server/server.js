import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import querystring from 'querystring';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
const app = express();
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

// redirect to spotify to get authorizaton from user
app.get('/api/token', (_req, res) => {
  // generate random string for state to make it secure when requesting from spotify per guidelines

  const generateRandomString = (length) => {
    return crypto.randomBytes(60).toString('hex').slice(0, length);
  };
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
      res.cookie('accToken', access_token, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });
      res.cookie('refToken', refresh_token);
      // use the access token to access the Spotify Web API

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

//endpoint to automatically refresh access token
app.get('/api/refresh_token', async (req, res, next) => {
  const refresh_token = req.cookies.refToken;
  if (req.cookies.accToken) return next();
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        new Buffer.from(client_id + ':' + client_secret).toString('base64'),
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

    // if (!authResponse.ok) {
    //   res.status(authResponse.status).send(authData);
    //   return;
    // }

    const access_token = authData.access_token;

    res.send({
      access_token: access_token,
    });
  } catch (error) {
    res.status(500).send({error: 'Internal Server Error'});
  }
});

// middleware to check if access token is still valid
const accTokenRefresh = async (req, res, next) => {
  if (req.cookies.accToken) return next();
  else if (req.cookies.refToken && req.cookies.refToken !== undefined) {
    console.log(req.cookies.refToken);
    const newToken = await fetch('http://localhost:5173/api/refresh_token', {
      headers: {
        Cookie: `refToken=${req.cookies.refToken}`,
      },
    });
    res.cookie('accToken', newToken.access_token, {
      maxAge: 60 * 1000,
    });
    return next();
  } else {
    return res.redirect('/api/token');
  }
};

app.get('/api/profile', async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const userResponse = await fetch(
    'https://api.spotify.com/v1/me',
    userOptions
  );
  const response = await userResponse.json();
  res.locals.data = response;
  res.status(200).json(res.locals.data);
});

app.get('/api/topArtists', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const apiData = await fetch(
    'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10',
    userOptions
  );
  const data = await apiData.json();
  const topArtists = data.items;
  const artistName = [];
  const artistImages = [];
  for (let i = 0; i < topArtists.length; i++) {
    artistName.push(topArtists[i].name);
    artistImages.push(topArtists[i].images[0].url);
  }
  const genres = {};
  for (let i = 0; i < topArtists.length; i++) {
    for (let j = 0; j < topArtists[i].genres.length; j++) {
      if (topArtists[i].genres[j] in genres) {
        genres[topArtists[i].genres[j]] = genres[topArtists[i].genres[j]] + 1;
      } else {
        genres[topArtists[i].genres[j]] = 1;
      }
    }
  }
  const genresSorted = Object.keys(genres).sort((a, b) => genres[b] - [a]);
  const genreDataSorted = Object.values(genres).sort((a, b) => b - a);
  const topGenres = [];
  const topGenreDataSorted = [];
  for (let i = 0; i < 5; i++) {
    topGenres.push(genresSorted[i]);
    topGenreDataSorted.push(genreDataSorted[i]);
  }

  res.locals.artistName = artistName;
  res.locals.artistImages = artistImages;
  res.locals.topGenres = topGenres;
  res.locals.topGenreDataSorted = topGenreDataSorted;
  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/topTracks', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const apiData = await fetch(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
    userOptions
  );
  const data = await apiData.json();
  const topTracks = data.items;
  const topTrackAlbumImgs = [];
  const topTrackArtistNames = [];
  const topTrackNames = [];
  for (let i = 0; i < topTracks.length; i++) {
    topTrackAlbumImgs.push(topTracks[i].album.images[1].url);
    topTrackArtistNames.push(topTracks[i].artists[0].name);
    topTrackNames.push(topTracks[i].name);
  }
  res.locals.topTrackAlbumImgs = topTrackAlbumImgs;
  res.locals.topTrackArtistNames = topTrackArtistNames;
  res.locals.topTrackNames = topTrackNames;
  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/featuredPlaylists', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const response = await fetch(
    'https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=10',
    userOptions
  );
  const apiData = await response.json();
  const featuredPlaylists = apiData.playlists.items;
  const featPlaylistName = [];
  const featPlaylistImg = [];
  const featPlaylistHref = [];
  for (let i = 0; i < featuredPlaylists.length; i++) {
    featPlaylistName.push(featuredPlaylists[i].name);
    featPlaylistImg.push(featuredPlaylists[i].images[0].url);
    featPlaylistHref.push(featuredPlaylists[i].external_urls.spotify);
  }
  console.log(featPlaylistHref);
  res.locals.featPlaylistName = featPlaylistName;
  res.locals.featPlaylistImg = featPlaylistImg;
  res.locals.featPlaylistHref = featPlaylistHref;
  // console.log(res.locals);

  return res.status(200).json(res.locals);
});

app.get('/api/newReleases', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const response = await fetch(
    'https://api.spotify.com/v1/browse/new-releases?country=US&limit=10',
    userOptions
  );
  const apiData = await response.json();
  const newReleases = apiData.albums.items;
  const newReleaseImgs = [];
  const newReleaseAlbums = [];
  const newReleaseHref = [];
  const newReleaseArtistName = [];
  for (let i = 0; i < newReleases.length; i++) {
    newReleaseImgs.push(newReleases[i].images[0].url);
    newReleaseAlbums.push(newReleases[i].name);
    newReleaseHref.push(newReleases[i].href);
    newReleaseArtistName.push(newReleases[i].artists[0].name);
  }
  res.locals.newReleaseArtistName = newReleaseArtistName;
  res.locals.newReleaseAlbums = newReleaseAlbums;
  res.locals.newReleaseImgs = newReleaseImgs;
  res.locals.newReleaseHref = newReleaseHref;

  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/hotHits', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const response = await fetch(
    'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?limit=10',
    userOptions
  );
  const apiData = await response.json();
  const hotHits = apiData.items;
  const hotHitArtists = [];
  const hotHitAlbumImgs = [];
  const hotHitTrackName = [];
  const hotHitPreview = [];
  const hotHitHref = [];
  for (let i = 0; i < hotHits.length; i++) {
    hotHitArtists.push(hotHits[i].track.artists[0].name);
    hotHitAlbumImgs.push(hotHits[i].track.album.images[0].url);
    hotHitTrackName.push(hotHits[i].track.name);
    hotHitPreview.push(hotHits[i].track.preview_url);
    hotHitHref.push(hotHits[i].track.external_urls.spotify);
  }
  res.locals.hotHitArtists = hotHitArtists;
  res.locals.hotHitAlbumImgs = hotHitAlbumImgs;
  res.locals.hotHitTrackName = hotHitTrackName;
  res.locals.hotHitHref = hotHitHref;
  console.log(res.locals);
  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/artistRecs', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const response = await fetch(
    'https://api.spotify.com/v1/artists/78rUTD7y6Cy67W1RVzYs7t/related-artists',
    userOptions
  );
  const apiData = await response.json();
  const relArtists = apiData.artists;
  const relArtistImgs = [];
  const relArtistNames = [];
  const relArtistHref = [];
  for (let i = 0; i < relArtists.length; i++) {
    relArtistImgs.push(relArtists[i].images[0].url);
    relArtistNames.push(relArtists[i].name);
    relArtistHref.push(relArtists[i].external_urls.spotify);
  }
  res.locals.relArtistImgs = relArtistImgs;
  res.locals.relArtistNames = relArtistNames;
  res.locals.relArtistHref = relArtistHref;
  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/songRecs', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const response = await fetch(
    'https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=6IPwKM3fUUzlElbvKw2sKl',
    userOptions
  );
  const apiData = await response.json();
  const songRecs = apiData.tracks;
  const songRecImg = [];
  const songRecArtistName = [];
  const songRecName = [];
  const songRecHref = [];
  for (let i = 0; i < songRecs.length; i++) {
    songRecImg.push(songRecs[i].album.images[0].url);
    songRecArtistName.push(songRecs[i].artists[0].name);
    songRecName.push(songRecs[i].name);
    songRecHref.push(songRecs[i].external_urls.spotify);
  }
  res.locals.songRecImg = songRecImg;
  res.locals.songRecArtistName = songRecArtistName;
  res.locals.songRecName = songRecName;
  res.locals.songRecHref = songRecHref;
  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/findArtist', accTokenRefresh, async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const queryName = req.query.artist;
  console.log(req.query.artist);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      queryName
    )}&type=artist&limit=10`,
    userOptions
  );
  const apiData = await response.json();
  const listOfArtists = apiData.artists.items;
  const artistNames = [];
  const artistImgs = [];
  const artistIDs = [];

  for (let i = 0; i < listOfArtists.length; i++) {
    artistNames.push(listOfArtists[i].name);
    if (listOfArtists[i].images[0]) {
      artistImgs.push(listOfArtists[i].images[0].url);
    } else {
      artistImgs.push('undefined');
    }
    artistIDs.push(listOfArtists[i].id);
  }

  res.locals.artistNames = artistNames;
  res.locals.artistImgs = artistImgs;
  res.locals.artistIDs = artistIDs;
  // console.log(res.locals);
  res.status(200).json(res.locals);
});

app.get('/api/findTrack', async (req, res) => {
  const userOptions = {
    headers: {
      Authorization: 'Bearer ' + req.cookies.accToken,
    },
  };
  const queryTrack = req.query.track;
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      queryTrack
    )}&type=track&limit=10`,
    userOptions
  );
  const apiData = await response.json();
  const songID = apiData.tracks.items[0].id;
  console.log(songID);
  res.locals.songID = songID;
  res.status(200).json(res.locals);
});
// catch-all route handler for any requests to an unknown route
app.use('*', (_req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, _req, res) => {
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
