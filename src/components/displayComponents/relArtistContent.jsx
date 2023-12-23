import {useEffect, useRef, useState} from 'react';

const RelArtistContent = ({artistRecID}) => {
  const [relArtistImgs, setRelArtistImgs] = useState([]);
  const [relArtistNames, setRelArtistNames] = useState([]);
  const [relArtistHref, setRelArtistHref] = useState([]);

  const relArtistCache = useRef(new Map());

  // // // need to add another endpoint to look up artists and allow people to choose
  useEffect(() => {
    // Check if artistRecID is provided before fetching data
    if (!artistRecID || artistRecID === '') {
      return; // Do not fetch data if artistRecID is not provided
    }

    // Check if data is in the cache for the specific artistRecID
    if (relArtistCache.current.has(artistRecID)) {
      console.log(`i'm in the cache`);

      const cachedData = relArtistCache.current.get(artistRecID);
      setRelArtistImgs(cachedData.relArtistImgs);
      setRelArtistNames(cachedData.relArtistNames);
      setRelArtistHref(cachedData.relArtistHref);
    } else {
      // If not in the cache, fetch data from the API
      fetch(
        `/api/artistRecs?artistRecID=${encodeURIComponent(artistRecID)}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          relArtistCache.current.set(artistRecID, {
            relArtistImgs: apiData.relArtistImgs,
            relArtistNames: apiData.relArtistNames,
            relArtistHref: apiData.relArtistHref,
          });
          // Update state with fetched data
          setRelArtistImgs(apiData.relArtistImgs);
          setRelArtistNames(apiData.relArtistNames);
          setRelArtistHref(apiData.relArtistHref);
        });
      });
    }
  }, [artistRecID]);

  const relArtistArray = [];
  for (let i = 0; i < relArtistImgs.length; i++) {
    relArtistArray.push(
      <div className="w-[25vh]">
        <div className=" text-white text-center ">
          <a href={relArtistHref[i]} target="_blank" rel="noreferrer">
            <img src={relArtistImgs[i]} className="album_img" />
          </a>
          <div className="text-lg">{relArtistNames[i]}</div>
        </div>
      </div>
    );
  }

  return <>{relArtistArray}</>;
};

export default RelArtistContent;
