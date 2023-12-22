import {useEffect, useState} from 'react';

const HotHitContent = () => {
  const [hotHitArtists, setHotHitArtists] = useState([]);
  const [hotHitAlbumImgs, setHotHitAlbumImgs] = useState([]);
  const [hotHitTrackName, setHotHitTrackName] = useState([]);
  const [hotHitHref, setHotHitHref] = useState([]);
  // // // can get hot hits or top hits for country, but need to get featured playlists for a country
  // // // parse the data for titles containing top / hits/ hot and then run that through the hot hits endpoint
  useEffect(() => {
    fetch('/api/hotHits').then((res) => {
      res.json().then((apiData) => {
        setHotHitAlbumImgs(apiData.hotHitAlbumImgs);
        setHotHitArtists(apiData.hotHitArtists);
        setHotHitTrackName(apiData.hotHitTrackName);
        setHotHitHref(apiData.hotHitHref);
      });
    });
  }, []);
  const hotHitArray = [];
  for (let i = 0; i < hotHitAlbumImgs.length; i++) {
    hotHitArray.push(
      <div className=" text-white text-center ">
        <a href={hotHitHref[i]} target="_blank" rel="noreferrer">
          <img src={hotHitAlbumImgs[i]} className="album_img" />
        </a>
        <div className="text-lg">{hotHitTrackName[i]}</div>
        <div className="text-base">{hotHitArtists[i]}</div>
      </div>
    );
  }

  return <>{hotHitArray}</>;
};

export default HotHitContent;
