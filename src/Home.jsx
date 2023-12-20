import {useState, useEffect} from 'react';
export default function Home() {
  const [user, setUser] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [topArtists, setTopArtists] = useState([]);
  const [topArtistImg, setTopArtistImg] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [topGenreData, setTopGenreData] = useState([]);

  const [topTrackNames, setTopTrackNames] = useState([]);
  const [topTrackArtists, setTopTrackArtists] = useState([]);
  const [topTrackImgs, setTopTrackImgs] = useState([]);

  const [featPlaylistName, setFeatPlaylistName] = useState([]);
  const [featPlaylistImg, setFeatPlaylistImg] = useState([]);
  const [featPlaylistHref, setFeatPlaylistHref] = useState([]);

  const [newReleaseArtists, setNewReleaseArtists] = useState([]);
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  const [newReleaseImgs, setNewReleaseImgs] = useState([]);
  const [newReleaseHrefs, setNewReleaseHrefs] = useState([]);

  const [hotHitArtists, setHotHitArtists] = useState([]);
  const [hotHitAlbumImgs, setHotHitAlbumImgs] = useState([]);
  const [hotHitTrackName, setHotHitTrackName] = useState([]);
  const [hotHitPreview, setHotHitPreview] = useState([]);

  const [relArtistImgs, setRelArtistImgs] = useState([]);
  const [relArtistNames, setRelArtistNames] = useState([]);

  const [songRecImg, setSongRecImg] = useState([]);
  const [songRecArtistName, setSongRecArtistName] = useState([]);
  const [songRecName, setSongRecName] = useState([]);

  // can make specific selections based on country, cache data received so it doesn't
  // keep requery the data if it was already viewed

  // separate useEffect just for profile since it will never change
  useEffect(() => {
    fetch('/api/profile').then((res) => {
      res.json().then((data) => {
        const name = data.display_name;
        setUser(data.display_name.charAt(0).toUpperCase() + name.slice(1));
        setProfilePic(data.images[0].url);
      });
    });
  }, []);

  // set users top information in the same as it will change based upon the length short, med, long.
  // can cache this info too so they don't always request the same data from endpoints
  useEffect(() => {
    fetch('/api/topArtists').then((res) => {
      res.json().then((apiData) => {
        setTopArtistImg(apiData.artistImages);
        setTopArtists(apiData.artistName);
        setTopGenres(apiData.topGenres);
        setTopGenreData(apiData.topGenreDataSorted);
        console.log(apiData);
      });
    });

    fetch('/api/topTracks').then((res) => {
      res.json().then((apiData) => {
        setTopTrackArtists(apiData.topTrackArtistNames);
        setTopTrackNames(apiData.topTrackNames);
        setTopTrackImgs(apiData.topTracksAlbumImg);
        console.log(apiData);
      });
    });
  }, []);

  // lets keep everything separate so they way we don't do multiple pings to api
  // just because they update the variable in a separate selection
  // can add feature to change based on selected country, give a list of countries
  useEffect(() => {
    fetch('/api/featuredPlaylists').then((res) => {
      res.json().then((apiData) => {
        setFeatPlaylistHref(apiData.featPlaylistHref);
        setFeatPlaylistImg(apiData.featPlaylistImg);
        setFeatPlaylistName(apiData.featPlaylistName);
        console.log(apiData);
      });
    });
  }, []);

  // can get new releases for a country,
  useEffect(() => {
    fetch('/api/newReleases').then((res) => {
      res.json().then((apiData) => {
        setNewReleaseAlbums(apiData.newReleaseAlbums);
        setNewReleaseArtists(apiData.newReleaseArtistName);
        setNewReleaseImgs(apiData.newReleaseImgs);
        setNewReleaseHrefs(apiData.newReleaseHref);
        console.log(apiData);
      });
    });
  }, []);

  // can get hot hits or top hits for country, but need to get featured playlists for a country
  // parse the data for titles containing top / hits/ hot and then run that through the hot hits endpoint
  useEffect(() => {
    fetch('/api/hotHits').then((res) => {
      res.json().then((apiData) => {
        setHotHitAlbumImgs(apiData.hotHitAlbumImgs);
        setHotHitArtists(apiData.hotHitArtists);
        setHotHitTrackName(apiData.hotHitTrackName);
        setHotHitPreview(apiData.hotHitPreview);
        console.log(apiData);
      });
    });
  }, []);

  // need to add another endpoint to look up artists and allow people to choose
  useEffect(() => {
    fetch('/api/artistRecs').then((res) => {
      res.json().then((apiData) => {
        setRelArtistImgs(apiData.relArtistImgs);
        setRelArtistNames(apiData.relArtistNames);
        console.log(apiData);
      });
    });
  }, []);

  // need to modify endpoint to take custom parameters like artist, genres, and tracks
  useEffect(() => {
    fetch('/api/songRecs').then((res) => {
      res.json().then((apiData) => {
        setSongRecArtistName(apiData.songRecArtistName);
        setSongRecImg(apiData.songRecImg);
        setSongRecName(apiData.songRecName);
        console.log(apiData);
      });
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="m-0 p-0 col-span-2 bg-slate-900 h-screen flex flex-col gap-4 pt-10 min-w-[150px]">
          <div className="flex gap-4 items-center justify-center pb-4 sidebar pt-2">
            <i className="fa-solid fa-headphones fa-sm"></i>
            <div className="text-slate-200 font-[sans]"> Rhythmic Retreat</div>
          </div>
          <div
            className="text-slate-500 sidebarOptions hover:text-green-600"
            onClick={() => fetch('/api/songRecs')}>
            Song Recs
          </div>
          <div
            className="text-slate-500 sidebarOptions hover:text-green-600"
            onClick={() => fetch('/api/artistRecs')}>
            Artist Recs
          </div>

          <div
            className="text-slate-500 sidebarOptions hover:text-green-600"
            onClick={() => fetch('/api/hotHits')}>
            Hot Hits
          </div>
          <div
            className="text-slate-500 text-s sidebarOptions hover:text-green-600"
            onClick={() => fetch('/api/newReleases')}>
            New Releases
          </div>
          <div
            className="text-slate-500 sidebarOptions hover:text-green-600 mb-4"
            onClick={() => fetch('/api/featuredPlaylists')}>
            Featured Playlists
          </div>
          <h4 className="text-slate-300 m-0 p-0 ">Your History</h4>
          <div
            className="text-slate-500 text-s sidebarOptions hover:text-green-600"
            onClick={() => fetch('/api/topArtists')}>
            Top Artists
          </div>
          <div
            className="text-slate-500 sidebarOptions hover:text-green-600"
            onClick={() => fetch('/api/topTracks')}>
            Top Tracks
          </div>
          <div className="text-slate-500 sidebarOptions hover:text-green-600">
            Top Genres
          </div>
        </div>
        <div className="col-span-10 bg-blue-950">
          <header className="flex justify-between h-16 items-center border-slate-600 mx-16">
            <div className="flex text-slate-400">Hello {user}</div>
            <div className="flex items-center gap-8 text-slate-400">
              <div className="">
                <i className="fa-solid fa-bell fa-sm"></i>
              </div>

              <img
                src={profilePic}
                className="object-cover rounded-full h-10"
              />
            </div>
          </header>
          <div className="text-slate-400">noway</div>
        </div>
      </div>
    </>
  );
}
