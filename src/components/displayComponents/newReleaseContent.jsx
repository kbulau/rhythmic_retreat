import {useEffect, useState} from 'react';

const NewReleaseContent = () => {
  const [newReleaseArtists, setNewReleaseArtists] = useState([]);
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  const [newReleaseImgs, setNewReleaseImgs] = useState([]);
  const [newReleaseHrefs, setNewReleaseHrefs] = useState([]);

  // // // can get new releases for a country,
  useEffect(() => {
    fetch('/api/newReleases').then((res) => {
      res.json().then((apiData) => {
        setNewReleaseAlbums(apiData.newReleaseAlbums);
        setNewReleaseArtists(apiData.newReleaseArtistName);
        setNewReleaseImgs(apiData.newReleaseImgs);
        setNewReleaseHrefs(apiData.newReleaseHref);
      });
    });
  }, []);

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

  return <>{NewReleaseContent}</>;
};

export default NewReleaseContent;
