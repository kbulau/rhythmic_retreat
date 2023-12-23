import {useEffect, useRef, useState} from 'react';

const HotHitContent = ({hotHitsCountry}) => {
  const [hotHitArtists, setHotHitArtists] = useState([]);
  const [hotHitAlbumImgs, setHotHitAlbumImgs] = useState([]);
  const [hotHitTrackName, setHotHitTrackName] = useState([]);
  const [hotHitHref, setHotHitHref] = useState([]);

  const hotHitCache = useRef(new Map());

  // // // can get hot hits or top hits for country, but need to get featured playlists for a country
  // // // parse the data for titles containing top / hits/ hot and then run that through the hot hits endpoint
  useEffect(() => {
    // Check if hotHitsCountry is provided and not an empty string before fetching data
    if (hotHitsCountry === '' || !hotHitsCountry) {
      return; // Do not fetch data if newReleaseCountry is not provided or is an empty string
    }
    // Check if data is in the cache for the specific hotHitsCountry
    if (hotHitCache.current.has(hotHitsCountry)) {
      console.log(`i'm in the cache`);

      const cachedData = hotHitCache.current.get(hotHitsCountry);
      setHotHitAlbumImgs(cachedData.hotHitAlbumImgs);
      setHotHitArtists(cachedData.hotHitArtists);
      setHotHitTrackName(cachedData.hotHitTrackName);
      setHotHitHref(cachedData.hotHitHref);
    } else {
      // If not in the cache, fetch data from the API
      fetch(
        `/api/hotHits?hotHitsCountry=${encodeURIComponent(hotHitsCountry)}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          hotHitCache.current.set(hotHitsCountry, {
            hotHitAlbumImgs: apiData.hotHitAlbumImgs,
            hotHitArtists: apiData.hotHitArtists,
            hotHitTrackName: apiData.hotHitTrackName,
            hotHitHref: apiData.hotHitHref,
          });
          // Update state with fetched data
          setHotHitAlbumImgs(apiData.hotHitAlbumImgs);
          setHotHitArtists(apiData.hotHitArtists);
          setHotHitTrackName(apiData.hotHitTrackName);
          setHotHitHref(apiData.hotHitHref);
        });
      });
    }
  }, [hotHitsCountry]);

  const hotHitArray = [];
  for (let i = 0; i < hotHitAlbumImgs.length; i++) {
    hotHitArray.push(
      <div className="w-[25vh]">
        <div className=" text-white text-center ">
          <a href={hotHitHref[i]} target="_blank" rel="noreferrer">
            <img src={hotHitAlbumImgs[i]} className="album_img" />
          </a>
          <div className="text-lg">{hotHitTrackName[i]}</div>
          <div className="text-base">{hotHitArtists[i]}</div>
        </div>
      </div>
    );
  }

  return <>{hotHitArray}</>;
};

export default HotHitContent;
