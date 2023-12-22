import {useEffect, useRef, useState} from 'react';
import SongRecContent from './displayComponents/songRecContent';
import TopTrackContent from './displayComponents/topTrackContent';
import TopArtistContent from './displayComponents/topArtistContent';
import FeatPlaylistContent from './displayComponents/featPlaylistContent';
import NewReleaseContent from './displayComponents/newReleaseContent';
import HotHitContent from './displayComponents/hotHitContent';
import RelArtistContent from './displayComponents/relArtistContent';

const Display = ({view}) => {
  const topArtistsCache = useRef(new Map());
  const topGenresCache = useRef(new Map());
  const topTracksCache = useRef(new Map());
  const featPlaylistCache = useRef(new Map());
  const newReleaseCache = useRef(new Map());
  const hotHitCache = useRef(new Map());
  const relArtistCache = useRef(new Map());

  const [lengthQuery, setLengthQuery] = useState('short_term');

  return (
    <div className=" mx-14 bg-blue-900 home_body overflow-auto">
      <div className="text-start pt-10 px-10 flex flex-wrap justify-around gap-10">
        {view === 'topTracks' && <TopTrackContent />}
        {view === 'topArtists' && <TopArtistContent />}
        {view === 'featPlaylists' && <FeatPlaylistContent />}
        {view === 'newReleases' && <NewReleaseContent />}
        {view === 'hotHits' && <HotHitContent />}
        {view === 'artistRecs' && <RelArtistContent />}
        {view === 'songRecs' && <SongRecContent />}
      </div>
    </div>
  );
};

export default Display;
