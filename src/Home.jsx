import {useState, useEffect} from 'react';
export default function Home() {
  const [user, setUser] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [tracks, setTracks] = useState([]);
  const [trackArt, setTrackArt] = useState([]);
  const [trackImg, setTrackImg] = useState([]);

  const [artists, setArtists] = useState([]);
  const [artistImg, setArtistImg] = useState([]);

  useEffect(() => {
    fetch('/api/profile').then((res) => {
      res.json().then((data) => {
        const name = data.display_name;
        setUser(data.display_name.charAt(0).toUpperCase() + name.slice(1));
        setProfilePic(data.images[0].url);
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
          <div className="text-slate-500 sidebarOptions hover:text-green-600">
            Song Recs
          </div>
          <div className="text-slate-500 sidebarOptions hover:text-green-600">
            Artist Recs
          </div>

          <div className="text-slate-500 sidebarOptions hover:text-green-600">
            Top Playlists
          </div>
          <div className="text-slate-500 text-s sidebarOptions hover:text-green-600">
            New Releases
          </div>
          <div className="text-slate-500 sidebarOptions hover:text-green-600 mb-4">
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
