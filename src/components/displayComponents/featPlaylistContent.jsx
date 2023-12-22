import {useEffect, useState} from 'react';

const FeatPlaylistContent = () => {
  const [featPlaylistName, setFeatPlaylistName] = useState([]);
  const [featPlaylistImg, setFeatPlaylistImg] = useState([]);
  const [featPlaylistHref, setFeatPlaylistHref] = useState([]);
  // // lets keep everything separate so they way we don't do multiple pings to api
  // // just because they update the variable in a separate selection
  // // can add feature to change based on selected country, give a list of countries
  useEffect(() => {
    fetch('/api/featuredPlaylists').then((res) => {
      res.json().then((apiData) => {
        setFeatPlaylistHref(apiData.featPlaylistHref);
        setFeatPlaylistImg(apiData.featPlaylistImg);
        setFeatPlaylistName(apiData.featPlaylistName);
      });
    });
  }, []);

  const featPlaylistArray = [];
  for (let i = 0; i < featPlaylistName.length; i++) {
    featPlaylistArray.push(
      <div className=" text-white text-center ">
        <a href={featPlaylistHref[i]} target="_blank" rel="noreferrer">
          <img src={featPlaylistImg[i]} className="album_img" />
        </a>
        <div className="text-lg">{featPlaylistName[i]}</div>
      </div>
    );
  }

  return <>{FeatPlaylistContent}</>;
};

export default FeatPlaylistContent;
