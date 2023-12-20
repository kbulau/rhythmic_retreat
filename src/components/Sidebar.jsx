const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;
