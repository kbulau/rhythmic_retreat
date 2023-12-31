import {useState} from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Display from '../components/Display.jsx';

export default function Home() {
  const [view, setView] = useState('topTracks');
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <Sidebar setView={setView} view={view} />
        <div className="col-span-10 row-span-1 bg-blue-950 overflow-hidden">
          <Header />
          <Display view={view} />
        </div>
      </div>
    </>
  );
}
