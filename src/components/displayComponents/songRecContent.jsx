import {useEffect, useRef, useState} from 'react';

const SongRecContent = ({songRecID}) => {
  const [songRecImg, setSongRecImg] = useState([]);
  const [songRecArtistName, setSongRecArtistName] = useState([]);
  const [songRecName, setSongRecName] = useState([]);
  const [songRecHref, setSongRecHref] = useState([]);

  const songRecCache = useRef(new Map());

  // // // need to modify endpoint to take custom parameters like artist, genres, and tracks
  useEffect(() => {
    // Check if songRecID is provided and not an empty string before fetching data
    if (songRecID !== '') {
      // Check if data is in the cache for the specific songRecID
      if (songRecCache.current.has(songRecID)) {
        console.log(`i'm in the cache`);

        const cachedData = songRecCache.current.get(songRecID);
        setSongRecArtistName(cachedData.songRecArtistName);
        setSongRecImg(cachedData.songRecImg);
        setSongRecName(cachedData.songRecName);
        setSongRecHref(cachedData.songRecHref);
      } else {
        console.log(`not in the cache`);
        // If not in the cache, fetch data from the API
        fetch(`/api/songRecs?songRecID=${encodeURIComponent(songRecID)}`).then(
          (res) => {
            res.json().then((apiData) => {
              // Save data to the cache
              songRecCache.current.set(songRecID, {
                songRecArtistName: apiData.songRecArtistName,
                songRecImg: apiData.songRecImg,
                songRecName: apiData.songRecName,
                songRecHref: apiData.songRecHref,
              });
              // Update state with fetched data
              setSongRecArtistName(apiData.songRecArtistName);
              setSongRecImg(apiData.songRecImg);
              setSongRecName(apiData.songRecName);
              setSongRecHref(apiData.songRecHref);
            });
          }
        );
      }
    }
  }, [songRecID]);

  const songRecArray = [];
  for (let i = 0; i < songRecArtistName.length; i++) {
    songRecArray.push(
      <div className="w-[25vh]">
        <div className=" text-white text-center ">
          <a href={songRecHref[i]} target="_blank" rel="noreferrer">
            <img src={songRecImg[i]} className="album_img" />
          </a>
          <div className="text-lg">{songRecName[i]}</div>
          <div className="text-base">{songRecArtistName[i]}</div>
        </div>
      </div>
    );
  }

  return <>{songRecArray}</>;
};

export default SongRecContent;
