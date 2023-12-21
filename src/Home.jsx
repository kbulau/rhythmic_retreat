import {useState, useEffect} from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Display from './components/Display.jsx';
export default function Home() {
  const [view, setView] = useState('topArtists');

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
          <Display />
        </div>
      </div>
    </>
  );
}
