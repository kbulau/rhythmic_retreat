import {useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
export default function Home() {
  const [view, setView] = useState('topArtists');

  const [topArtists, setTopArtists] = useState([]);
  const [topArtistImg, setTopArtistImg] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [topGenreData, setTopGenreData] = useState([]);

  const [topTrackNames, setTopTrackNames] = useState([]);
  const [topTrackArtistNames, setTopTrackArtistNames] = useState([]);
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

  // set users top information in the same as it will change based upon the length short, med, long.
  // can cache this info too so they don't always request the same data from endpoints
  useEffect(() => {
    fetch('/api/topArtists').then((res) => {
      res.json().then((apiData) => {
        setTopArtistImg(apiData.artistImages);
        setTopArtists(apiData.artistName);
        setTopGenres(apiData.topGenres);
        setTopGenreData(apiData.topGenreDataSorted);
      });
    });

    fetch('/api/topTracks').then((res) => {
      res.json().then((apiData) => {
        setTopTrackArtistNames(apiData.topTrackArtistNames);
        setTopTrackNames(apiData.topTrackNames);
        setTopTrackImgs(apiData.topTrackAlbumImgs);
      });
    });
  }, []);

  // lets keep everything separate so they way we don't do multiple pings to api
  // just because they update the variable in a separate selection
  // can add feature to change based on selected country, give a list of countries
  // useEffect(() => {
  //   fetch('/api/featuredPlaylists').then((res) => {
  //     res.json().then((apiData) => {
  //       setFeatPlaylistHref(apiData.featPlaylistHref);
  //       setFeatPlaylistImg(apiData.featPlaylistImg);
  //       setFeatPlaylistName(apiData.featPlaylistName);
  //     });
  //   });
  // }, []);

  // // can get new releases for a country,
  // useEffect(() => {
  //   fetch('/api/newReleases').then((res) => {
  //     res.json().then((apiData) => {
  //       setNewReleaseAlbums(apiData.newReleaseAlbums);
  //       setNewReleaseArtists(apiData.newReleaseArtistName);
  //       setNewReleaseImgs(apiData.newReleaseImgs);
  //       setNewReleaseHrefs(apiData.newReleaseHref);
  //     });
  //   });
  // }, []);

  // // can get hot hits or top hits for country, but need to get featured playlists for a country
  // // parse the data for titles containing top / hits/ hot and then run that through the hot hits endpoint
  // useEffect(() => {
  //   fetch('/api/hotHits').then((res) => {
  //     res.json().then((apiData) => {
  //       setHotHitAlbumImgs(apiData.hotHitAlbumImgs);
  //       setHotHitArtists(apiData.hotHitArtists);
  //       setHotHitTrackName(apiData.hotHitTrackName);
  //       setHotHitPreview(apiData.hotHitPreview);
  //     });
  //   });
  // }, []);

  // // need to add another endpoint to look up artists and allow people to choose
  // useEffect(() => {
  //   fetch('/api/artistRecs').then((res) => {
  //     res.json().then((apiData) => {
  //       setRelArtistImgs(apiData.relArtistImgs);
  //       setRelArtistNames(apiData.relArtistNames);
  //     });
  //   });
  // }, []);

  // // need to modify endpoint to take custom parameters like artist, genres, and tracks
  // useEffect(() => {
  //   fetch('/api/songRecs').then((res) => {
  //     res.json().then((apiData) => {
  //       setSongRecArtistName(apiData.songRecArtistName);
  //       setSongRecImg(apiData.songRecImg);
  //       setSongRecName(apiData.songRecName);
  //     });
  //   });
  // }, []);

  const topTracksArray = [];

  for (let i = 0; i < topArtists.length; i++) {
    topTracksArray.push(
      <div className=" text-white text-center ">
        <img src={topTrackImgs[i]} className="album_img"></img>
        <div className="text-lg">{topTrackNames[i]}</div>
        <div className="text-base">{topTrackArtistNames[i]}</div>
      </div>
    );
  }
  console.log(topTrackImgs[0]);
  console.log(topTrackArtistNames[0]);
  console.log(topTrackNames[0]);
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <Sidebar setView={setView} view={view} />
        <div className="col-span-10 row-span-1 bg-blue-950">
          <Header />
          <div className="mx-14 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
            <div className="text-center text-white text pt-4">Top Artists</div>
            <div>hi</div>
          </div>
          <div className=" mx-14 bg-blue-900 home_body overflow-auto">
            <div className="text-start pt-10 px-10 flex flex-wrap justify-around gap-10">
              {topTracksArray}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
