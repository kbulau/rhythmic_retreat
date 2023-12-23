import {useEffect, useRef, useState} from 'react';

const TopTrackContent = ({lengthQuery}) => {
  const [topTrackNames, setTopTrackNames] = useState([]);
  const [topTrackArtistNames, setTopTrackArtistNames] = useState([]);
  const [topTrackImgs, setTopTrackImgs] = useState([]);

  const topTracksCache = useRef(new Map());

  useEffect(() => {
    console.log(lengthQuery);
    if (topTracksCache.current.has(lengthQuery)) {
      console.log(`i'm in the cache`);

      const cachedData = topTracksCache.current.get(lengthQuery);
      setTopTrackArtistNames(cachedData.topTrackArtistNames);
      setTopTrackNames(cachedData.topTrackNames);
      setTopTrackImgs(cachedData.topTrackAlbumImgs);
    } else {
      // If not in the cache, fetch data from the API
      fetch(
        `/api/topTracks?lengthQuery=${encodeURIComponent(lengthQuery)}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          topTracksCache.current.set(lengthQuery, {
            topTrackArtistNames: apiData.topTrackArtistNames,
            topTrackNames: apiData.topTrackNames,
            topTrackAlbumImgs: apiData.topTrackAlbumImgs,
          });
          // Update state with fetched data
          setTopTrackArtistNames(apiData.topTrackArtistNames);
          setTopTrackNames(apiData.topTrackNames);
          setTopTrackImgs(apiData.topTrackAlbumImgs);
        });
      });
    }
  }, [lengthQuery]);

  const topTracksArray = [];
  for (let i = 0; i < topTrackArtistNames.length; i++) {
    topTracksArray.push(
      <div className="w-[25vh]">
        <div className=" text-white text-center ">
          <img src={topTrackImgs[i]} className="album_img"></img>
          <div className="text-lg">{topTrackNames[i]}</div>
          <div className="text-base">{topTrackArtistNames[i]}</div>
        </div>
      </div>
    );
  }

  return <>{topTracksArray}</>;
};

export default TopTrackContent;
