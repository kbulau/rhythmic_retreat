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
  const [newReleaseAlbum, setNewReleaseAlbum] = useState([]);
  const [newReleaseImgs, setNewReleaseImgs] = useState([]);
  const [newReleaseHref, setNewReleaseHref] = useState([]);

  const [hotHitArtists, setHotHitArtists] = useState([]);
  const [hotHitAlbumImgs, setHotHitAlbumImgs] = useState([]);
  const [hotHitTrackName, setHotHitTrackName] = useState([]);
  const [hotHitPreview, setHotHitPreview] = useState([]);

  const [relArtistImgs, setRelArtistImgs] = useState([]);
  const [relArtistNames, setRelArtistNames] = useState([]);

  const [songRecImg, setSongRecImg] = useState([]);
  const [songRecArtistName, setSongRecArtistName] = useState([]);
  const [songRecName, setSongRecName] = useState([]);

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
        setTopTrackArtists(apiData.topTrackArtistNames);
        setTopTrackNames(apiData.topTrackNames);
        setTopTrackImgs(apiData.topTracksAlbumImg);
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
