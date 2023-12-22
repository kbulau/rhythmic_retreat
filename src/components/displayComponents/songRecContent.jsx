import {useEffect, useState} from 'react';

const SongRecContent = () => {
  const [songRecImg, setSongRecImg] = useState([]);
  const [songRecArtistName, setSongRecArtistName] = useState([]);
  const [songRecName, setSongRecName] = useState([]);
  const [songRecHref, setSongRecHref] = useState([]);

  // // // need to modify endpoint to take custom parameters like artist, genres, and tracks
  useEffect(() => {
    fetch('/api/songRecs').then((res) => {
      res.json().then((apiData) => {
        setSongRecArtistName(apiData.songRecArtistName);
        setSongRecImg(apiData.songRecImg);
        setSongRecName(apiData.songRecName);
        setSongRecHref(apiData.songRecHref);
      });
    });
  }, []);
  const songRecArray = [];

  console.log(songRecArtistName);
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
