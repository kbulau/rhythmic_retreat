import {useEffect, useState} from 'react';

const TopTrackContent = () => {
  const [topTrackNames, setTopTrackNames] = useState([]);
  const [topTrackArtistNames, setTopTrackArtistNames] = useState([]);
  const [topTrackImgs, setTopTrackImgs] = useState([]);

  useEffect(() => {
    fetch('/api/topTracks').then((res) => {
      res.json().then((apiData) => {
        setTopTrackArtistNames(apiData.topTrackArtistNames);
        setTopTrackNames(apiData.topTrackNames);
        setTopTrackImgs(apiData.topTrackAlbumImgs);
      });
    });
  }, []);

  const topTracksArray = [];
  for (let i = 0; i < topTrackArtistNames.length; i++) {
    topTracksArray.push(
      <div className=" text-white text-center ">
        <img src={topTrackImgs[i]} className="album_img"></img>
        <div className="text-lg">{topTrackNames[i]}</div>
        <div className="text-base">{topTrackArtistNames[i]}</div>
      </div>
    );
  }

  return <>{topTracksArray}</>;
};

export default TopTrackContent;
