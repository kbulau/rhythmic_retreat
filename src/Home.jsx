export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="m-0 p-0 col-span-2 bg-slate-900 h-screen flex flex-col gap-4 pt-10 min-w-[150px]">
          <div className="text-slate-500 text-s">Browse</div>
          <div className="text-slate-500">music</div>
          <div className="text-slate-500">Stations</div>
          <div className="text-slate-500"> mv</div>
          <div className="text-slate-500 pb-4">Artist</div>
          <h3 className="text-slate-300">Playlists</h3>
          <div className="text-slate-500">Stations</div>
          <div className="text-slate-500"> mv</div>
          <div className="text-slate-500 pb-4">Artist</div>
        </div>
        <div className="col-span-10 bg-blue-950">
          <header className="flex justify-between h-16 items-center border-slate-600 mx-16">
            <div className="flex text-slate-400">hi</div>
            <div className="flex gap-8 text-slate-400">
              <div>hi</div>
              <div>hi</div>
            </div>
          </header>
          <div className="text-slate-400">noway</div>
        </div>
      </div>
    </>
  );
}
