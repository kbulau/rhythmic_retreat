import {useState} from 'react';
import SongRecContent from './displayComponents/songRecContent';
import TopTrackContent from './displayComponents/topTrackContent';
import TopArtistContent from './displayComponents/topArtistContent';
import FeatPlaylistContent from './displayComponents/featPlaylistContent';
import NewReleaseContent from './displayComponents/newReleaseContent';
import HotHitContent from './displayComponents/hotHitContent';
import RelArtistContent from './displayComponents/relArtistContent';
import TopBarCountry from './topBarComponents/TopBarCountry';
import TopBarLength from './topBarComponents/TopBarLength';
import TopBarArtists from './topBarComponents/TopBarArtists';
import TopBarSongRecs from './topBarComponents/TopBarSongRecs';

const Display = ({view}) => {
  const [lengthQuery, setLengthQuery] = useState('short_term');
  // const [topGenres, setTopGenres] = useState([]);
  // const [topGenreData, setTopGenreData] = useState([]);

  const [newReleaseCountry, setNewReleaseCountry] = useState('US');
  const [featPlaylistCountry, setFeatPlaylistCountry] = useState('US');
  const [hotHitsCountry, setHotHitsCountry] = useState('');
  const [artistRecID, setArtistRecID] = useState('');
  const [songRecID, setSongRecID] = useState('');

  const newReleaseFunction = (country) => {
    setNewReleaseCountry(country);
  };
  const featPlaylistFunction = (country) => {
    setFeatPlaylistCountry(country);
  };
  const hotHitsFunction = (country) => {
    setHotHitsCountry(country);
  };

  const topBarComponents = {
    newReleases: (
      <TopBarCountry
        setCountry={newReleaseFunction}
        country={newReleaseCountry}
        view={view}
      />
    ),
    featPlaylists: (
      <TopBarCountry
        setCountry={featPlaylistFunction}
        country={featPlaylistCountry}
        view={view}
      />
    ),
    hotHits: (
      <TopBarCountry
        setCountry={hotHitsFunction}
        country={hotHitsCountry}
        view={view}
      />
    ),
    topArtists: (
      <TopBarLength
        lengthQuery={lengthQuery}
        setLengthQuery={setLengthQuery}
        view={view}
      />
    ),
    topTracks: (
      <TopBarLength
        lengthQuery={lengthQuery}
        setLengthQuery={setLengthQuery}
        view={view}
      />
    ),
    artistRecs: <TopBarArtists setArtistRecID={setArtistRecID} />,
    songRecs: <TopBarSongRecs setSongRecID={setSongRecID} />,
  };
  return (
    <>
      {topBarComponents[view]}
      <div className=" mx-14 bg-blue-900 home_body overflow-auto">
        <div className="text-start pt-10 px-10 flex flex-wrap justify-around gap-10">
          {view === 'topTracks' && (
            <TopTrackContent lengthQuery={lengthQuery} />
          )}
          {view === 'topArtists' && (
            <TopArtistContent
              lengthQuery={lengthQuery}
              // setTopGenreData={setTopGenreData}
              // setTopGenres={setTopGenres}
            />
          )}
          {view === 'featPlaylists' && (
            <FeatPlaylistContent featPlaylistCountry={featPlaylistCountry} />
          )}
          {view === 'newReleases' && (
            <NewReleaseContent newReleaseCountry={newReleaseCountry} />
          )}
          {view === 'hotHits' && (
            <HotHitContent hotHitsCountry={hotHitsCountry} />
          )}
          {view === 'artistRecs' && (
            <RelArtistContent artistRecID={artistRecID} />
          )}
          {view === 'songRecs' && <SongRecContent songRecID={songRecID} />}
        </div>
      </div>
    </>
  );
};

export default Display;
