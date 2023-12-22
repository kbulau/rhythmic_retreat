import {useState} from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Display from './components/Display.jsx';
import TopBarCountry from './components/topBarComponents/TopBarCountry.jsx';
import TopBarLength from './components/topBarComponents/TopBarLength.jsx';
import TopBarArtists from './components/topBarComponents/TopBarArtists.jsx';
import TopBarSongRecs from './components/topBarComponents/TopBarSongRecs.jsx';
export default function Home() {
  const [view, setView] = useState('hotHits');
  const [country, setCountry] = useState('US');
  const [lengthQuery, setLengthQuery] = useState('short_term');
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <Sidebar setView={setView} view={view} />
        <div className="col-span-10 row-span-1 bg-blue-950 overflow-hidden">
          <Header />
          <TopBarCountry
            setCountry={setCountry}
            country={country}
            view={view}
          />
          {/* <TopBarLength setLengthQuery={setLengthQuery} /> */}
          {/* <TopBarArtists /> */}
          {/* <TopBarSongRecs /> */}
          <Display />
        </div>
      </div>
    </>
  );
}
