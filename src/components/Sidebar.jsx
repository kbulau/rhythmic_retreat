const Sidebar = ({setView}) => {
  // attempted to get css to display green once an sidebar option was clicked and changed,
  // after a new one was clicked, but it wasn't working properly
  // const setSideBar = (selection) => {
  //   let currentView = document.getElementById(view);
  //   currentView.classList.remove('selectedView');
  //   currentView.classList.add('unselectedView');
  //   currentView.style.color = '';
  //   currentView.style.border = '';
  //   setView(selection);
  //   const newView = document.getElementById(view);
  //   newView.classList.add('selectedView');
  // };

  return (
    <div className="m-0 p-0 col-span-2 bg-slate-900 h-screen flex flex-col gap-4 pt-10 min-w-[150px]">
      <div className="flex gap-4 items-center justify-center sidebar pt-2">
        <i className="fa-solid fa-headphones fa-sm"></i>
        <div className="text-slate-200 font-[sans]"> Rhythmic Retreat</div>
      </div>

      <div
        className="text-slate-500 sidebarOptions hover:text-green-600"
        id="songRecs"
        onClick={() => setView('songRecs')}>
        Song Recs
      </div>
      <div
        className="text-slate-500 sidebarOptions hover:text-green-600"
        id="artistRecs"
        onClick={() => setView('artistRecs')}>
        Artist Recs
      </div>

      <div
        className="text-slate-500 sidebarOptions hover:text-green-600"
        id="hotHits"
        onClick={() => setView('hotHits')}>
        Hot Hits
      </div>
      <div
        className="text-slate-500 text-s sidebarOptions hover:text-green-600"
        id="newReleases"
        onClick={() => setView('newReleases')}>
        New Releases
      </div>
      <div
        className="text-slate-500 sidebarOptions hover:text-green-600 mb-4"
        id="featPlaylists"
        onClick={() => setView('featPlaylists')}>
        Featured Playlists
      </div>
      <h4 className="text-slate-300 m-0 p-0 ">Your History</h4>
      <div
        className="text-slate-500 text-s sidebarOptions hover:text-green-600"
        id="topArtists"
        onClick={() => setView('topArtists')}>
        Top Artists
      </div>
      <div
        className="text-slate-500 sidebarOptions hover:text-green-600"
        id="topTracks"
        onClick={() => setView('topTracks')}>
        Top Tracks
      </div>
      <div
        className="text-slate-500 sidebarOptions hover:text-green-600"
        id="topGenres"
        onClick={() => setView('topGenres')}>
        Top Genres
      </div>
    </div>
  );
};

export default Sidebar;
