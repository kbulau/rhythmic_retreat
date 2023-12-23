import {useEffect, useRef, useState} from 'react';

const FeatPlaylistContent = ({featPlaylistCountry}) => {
  const [featPlaylistName, setFeatPlaylistName] = useState([]);
  const [featPlaylistImg, setFeatPlaylistImg] = useState([]);
  const [featPlaylistHref, setFeatPlaylistHref] = useState([]);

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
      // If not in the cache, fetch data from the API
      fetch(
        `/api/featuredPlaylists?featPlaylistCountry=${encodeURIComponent(
          featPlaylistCountry
        )}`
      ).then((res) => {
        res.json().then((apiData) => {
          // Save data to the cache
          featPlaylistCache.current.set(featPlaylistCountry, {
            featPlaylistHref: apiData.featPlaylistHref,
            featPlaylistImg: apiData.featPlaylistImg,
            featPlaylistName: apiData.featPlaylistName,
          });
          // Update state with fetched data
          setFeatPlaylistHref(apiData.featPlaylistHref);
          setFeatPlaylistImg(apiData.featPlaylistImg);
          setFeatPlaylistName(apiData.featPlaylistName);
        });
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

  return <>{featPlaylistArray}</>;
};

export default FeatPlaylistContent;
