import {useEffect, useRef, useState} from 'react';

const NewReleaseContent = ({newReleaseCountry}) => {
  const [newReleaseArtists, setNewReleaseArtists] = useState([]);
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  const [newReleaseImgs, setNewReleaseImgs] = useState([]);
  const [newReleaseHrefs, setNewReleaseHrefs] = useState([]);

  const newReleaseCache = useRef(new Map());

  // // // can get new releases for a country,
  useEffect(() => {
    console.log('inside useEffect');
    // Check if newReleaseCountry is provided and not an empty string before fetching data
    if (!newReleaseCountry || newReleaseCountry === '') {
      return; // Do not fetch data if newReleaseCountry is not provided or is an empty string
    }

    // Check if data is in the cache for the specific newReleaseCountry
    if (newReleaseCache.current.has(newReleaseCountry)) {
      console.log(`i'm in the cache`);

      const cachedData = newReleaseCache.current.get(newReleaseCountry);
      setNewReleaseAlbums(cachedData.newReleaseAlbums);
      setNewReleaseArtists(cachedData.newReleaseArtists);
      setNewReleaseImgs(cachedData.newReleaseImgs);
      setNewReleaseHrefs(cachedData.newReleaseHrefs);
    } else {
      // If not in the cache, fetch data from the API
      fetch(
        `/api/newReleases?newReleaseCountry=${encodeURIComponent(
          newReleaseCountry
        )}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          newReleaseCache.current.set(newReleaseCountry, {
            newReleaseAlbums: apiData.newReleaseAlbums,
            newReleaseArtists: apiData.newReleaseArtistName,
            newReleaseImgs: apiData.newReleaseImgs,
            newReleaseHrefs: apiData.newReleaseHref,
          });
          // Update state with fetched data
          setNewReleaseAlbums(apiData.newReleaseAlbums);
          setNewReleaseArtists(apiData.newReleaseArtistName);
          setNewReleaseImgs(apiData.newReleaseImgs);
          setNewReleaseHrefs(apiData.newReleaseHref);
        });
      });
    }
  }, [newReleaseCountry]);

  const newReleaseArray = [];
  for (let i = 0; i < newReleaseAlbums.length; i++) {
    newReleaseArray.push(
      <div className=" w-[25vh]">
        <div className=" text-white text-center ">
          <a href={newReleaseHrefs[i]} target="_blank" rel="noreferrer">
            <img src={newReleaseImgs[i]} className="album_img" />
          </a>
          <div className="text-lg">{newReleaseAlbums[i]}</div>
          <div className="text-base">{newReleaseArtists[i]}</div>
        </div>
      </div>
    );
  }

  return <>{newReleaseArray}</>;
};

export default NewReleaseContent;
