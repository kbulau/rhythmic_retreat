import {useEffect, useState} from 'react';

const RelArtistContent = () => {
  const [relArtistImgs, setRelArtistImgs] = useState([]);
  const [relArtistNames, setRelArtistNames] = useState([]);
  const [relArtistHref, setRelArtistHref] = useState([]);

  // // // need to add another endpoint to look up artists and allow people to choose
  useEffect(() => {
    fetch('/api/artistRecs').then((res) => {
      res.json().then((apiData) => {
        setRelArtistImgs(apiData.relArtistImgs);
        setRelArtistNames(apiData.relArtistNames);
        setRelArtistHref(apiData.relArtistHref);
      });
    });
  }, []);

  const relArtistArray = [];
  for (let i = 0; i < relArtistImgs.length; i++) {
    relArtistArray.push(
      <div className=" text-white text-center ">
        <a href={relArtistHref[i]} target="_blank" rel="noreferrer">
          <img src={relArtistImgs[i]} className="album_img" />
        </a>
        <div className="text-lg">{relArtistNames[i]}</div>
      </div>
    );
  }

  return <>{relArtistArray}</>;
};

export default RelArtistContent;
