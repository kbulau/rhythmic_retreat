import {useEffect, useRef, useState} from 'react';

const TopArtistContent = ({lengthQuery}) => {
  const [topArtists, setTopArtists] = useState([]);
  const [topArtistImg, setTopArtistImg] = useState([]);

  const topArtistsCache = useRef(new Map());

  useEffect(() => {
    // Check if data is in the cache
    if (topArtistsCache.current.has(lengthQuery)) {
      console.log(`i'm in the cache`);

      const cachedData = topArtistsCache.current.get(lengthQuery);
      setTopArtistImg(cachedData.artistImages);
      setTopArtists(cachedData.artistName);
    } else {
      // If not in the cache, fetch data from the API
      fetch(
        `/api/topArtists?lengthQuery=${encodeURIComponent(lengthQuery)}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          console.log(apiData);
          topArtistsCache.current.set(lengthQuery, {
            artistImages: apiData.artistImages,
            artistName: apiData.artistName,
          });

          // Update state with fetched data
          setTopArtistImg(apiData.artistImages);
          setTopArtists(apiData.artistName);
        });
      });
    }
  }, [lengthQuery]);

  const topArtistArray = [];
  for (let i = 0; i < topArtists.length; i++) {
    topArtistArray.push(
      <div className="w-[25vh]">
        <div className=" text-white text-center ">
          <img src={topArtistImg[i]} className="album_img"></img>
          <div className="text-lg mt-2">{topArtists[i]}</div>
        </div>
      </div>
    );
  }

  return <>{topArtistArray}</>;
};

export default TopArtistContent;
