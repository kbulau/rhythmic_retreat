import {useEffect, useRef, useState} from 'react';

const NewReleaseContent = ({newReleaseCountry}) => {
  const [newReleaseArtists, setNewReleaseArtists] = useState([]);
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  const [newReleaseImgs, setNewReleaseImgs] = useState([]);
  const [newReleaseHrefs, setNewReleaseHrefs] = useState([]);
  const [error, setError] = useState(null);

  const newReleaseCache = useRef(new Map());

  // // // can get new releases for a country,
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is in the cache for the specific newReleaseCountry
        if (newReleaseCache.current.has(newReleaseCountry)) {
          console.log(`i'm in the cache`);

          const cachedData = newReleaseCache.current.get(newReleaseCountry);
          setNewReleaseAlbums(cachedData.newReleaseAlbums);
          setNewReleaseArtists(cachedData.newReleaseArtists);
          setNewReleaseImgs(cachedData.newReleaseImgs);
          setNewReleaseHrefs(cachedData.newReleaseHrefs);
        } else {
          const response = await fetch(
            `/api/newReleases?newReleaseCountry=${encodeURIComponent(
              newReleaseCountry
            )}`
          );

          if (!response.ok) {
            throw new Error('Country not supported by Spotify');
          }

          const apiData = await response.json();
          newReleaseCache.current.set(newReleaseCountry, {
            newReleaseAlbums: apiData.newReleaseAlbums,
            newReleaseArtists: apiData.newReleaseArtistName,
            newReleaseImgs: apiData.newReleaseImgs,
            newReleaseHrefs: apiData.newReleaseHref,
          });
          setNewReleaseAlbums(apiData.newReleaseAlbums);
          setNewReleaseArtists(apiData.newReleaseArtistName);
          setNewReleaseImgs(apiData.newReleaseImgs);
          setNewReleaseHrefs(apiData.newReleaseHref);
          setError(null); // Clear the error state if the request is successful
        }
      } catch (error) {
        setError(error.message); // Set the error state with the error message
      }
    };

    fetchData();
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
  if (error) {
    return <div>This country isn&apos;t supported by Spotify: {error}</div>;
  }

  return <>{newReleaseArray}</>;
};

export default NewReleaseContent;
