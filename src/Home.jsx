import {useState} from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Display from './components/Display.jsx';
import TopBarCountry from './components/topBarComponents/TopBarCountry.jsx';
import TopBarLength from './components/topBarComponents/TopBarLength.jsx';
import TopBarArtists from './components/topBarComponents/TopBarArtists.jsx';
export default function Home() {
  const [view, setView] = useState('topArtists');
  const [country, setCountry] = useState('US');
  const [lengthQuery, setLengthQuery] = useState('short_term');
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <Sidebar setView={setView} view={view} />
        <div className="col-span-10 row-span-1 bg-blue-950 overflow-hidden">
          <Header />
          {/* <TopBarCountry setCountry={setCountry} country={country} /> */}
          {/* <TopBarLength setLengthQuery={setLengthQuery} /> */}
          <TopBarArtists />
          <Display />
        </div>
      </div>
    </>
  );
}
