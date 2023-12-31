import {useEffect, useRef, useState} from 'react';

const FeatPlaylistContent = ({featPlaylistCountry}) => {
  const [featPlaylistName, setFeatPlaylistName] = useState([]);
  const [featPlaylistImg, setFeatPlaylistImg] = useState([]);
  const [featPlaylistHref, setFeatPlaylistHref] = useState([]);
  const [error, setError] = useState(null); // New state variable for error handling

  const featPlaylistCache = useRef(new Map());

  // // lets keep everything separate so they way we don't do multiple pings to api
  // // just because they update the variable in a separate selection
  // // can add feature to change based on selected country, give a list of countries
  useEffect(() => {
    console.log('inside featplaylist effect');
    console.log(featPlaylistCountry);
    // if (featPlaylistCountry === '' || !featPlaylistCountry) {
    //   return;
    // }
    // Check if data is in the cache for the specific featPlaylistCountry
    if (featPlaylistCache.current.has(featPlaylistCountry)) {
      console.log(`i'm in the cache`);
      const cachedData = featPlaylistCache.current.get(featPlaylistCountry);
      setFeatPlaylistHref(cachedData.featPlaylistHref);
      setFeatPlaylistImg(cachedData.featPlaylistImg);
      setFeatPlaylistName(cachedData.featPlaylistName);
    } else {
      fetch(
        `/api/featuredPlaylists?featPlaylistCountry=${encodeURIComponent(
          featPlaylistCountry
        )}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error('Country not supported by Spotify'); // Throw an error for unsupported country
          }
          return res.json();
        })
        .then((apiData) => {
          featPlaylistCache.current.set(featPlaylistCountry, {
            featPlaylistHref: apiData.featPlaylistHref,
            featPlaylistImg: apiData.featPlaylistImg,
            featPlaylistName: apiData.featPlaylistName,
          });
          setFeatPlaylistHref(apiData.featPlaylistHref);
          setFeatPlaylistImg(apiData.featPlaylistImg);
          setFeatPlaylistName(apiData.featPlaylistName);
          setError(null); // Clear the error state if the request is successful
        })
        .catch((error) => {
          setError(error.message); // Set the error state with the error message
        });
    }
  }, [featPlaylistCountry]);

  const featPlaylistArray = [];
  for (let i = 0; i < featPlaylistName.length; i++) {
    featPlaylistArray.push(
      <div className="w-[25vh]">
        <div className=" text-white text-center ">
          <a href={featPlaylistHref[i]} target="_blank" rel="noreferrer">
            <img src={featPlaylistImg[i]} className="album_img" />
          </a>
          <div className="text-lg">{featPlaylistName[i]}</div>
        </div>
      </div>
    );
  }
  if (error) {
    return <div>This country isn&apos;t supported by Spotify: {error}</div>;
  }
  return <>{featPlaylistArray}</>;
};

export default FeatPlaylistContent;
