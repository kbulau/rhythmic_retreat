import {useEffect, useState} from 'react';

const TopArtistContent = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [topArtistImg, setTopArtistImg] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [topGenreData, setTopGenreData] = useState([]);
  useEffect(() => {
    fetch('/api/topArtists').then((res) => {
      res.json().then((apiData) => {
        setTopArtistImg(apiData.artistImages);
        setTopArtists(apiData.artistName);
        setTopGenres(apiData.topGenres);
        setTopGenreData(apiData.topGenreDataSorted);
      });
    });
  }, []);
  const topArtistArray = [];
  for (let i = 0; i < topArtists.length; i++) {
    topArtistArray.push(
      <div className=" text-white text-center ">
        <img src={topArtistImg[i]} className="album_img"></img>
        <div className="text-lg mt-2">{topArtists[i]}</div>
      </div>
    );
  }

  return <>{TopArtistContent}</>;
};

export default TopArtistContent;
