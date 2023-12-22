import {useEffect, useRef, useState} from 'react';

const Display = () => {
  const topArtistsCache = useRef(new Map());
  const topGenresCache = useRef(new Map());
  const topTracksCache = useRef(new Map());
  const featPlaylistCache = useRef(new Map());
  const newReleaseCache = useRef(new Map());
  const hotHitCache = useRef(new Map());
  const relArtistCache = useRef(new Map());

  const [lengthQuery, setLengthQuery] = useState('short_term');

  const [topArtists, setTopArtists] = useState([]);
  const [topArtistImg, setTopArtistImg] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [topGenreData, setTopGenreData] = useState([]);

  const [topTrackNames, setTopTrackNames] = useState([]);
  const [topTrackArtistNames, setTopTrackArtistNames] = useState([]);
  const [topTrackImgs, setTopTrackImgs] = useState([]);

  const [featPlaylistName, setFeatPlaylistName] = useState([]);
  const [featPlaylistImg, setFeatPlaylistImg] = useState([]);
  const [featPlaylistHref, setFeatPlaylistHref] = useState([]);

  const [newReleaseArtists, setNewReleaseArtists] = useState([]);
  const [newReleaseAlbums, setNewReleaseAlbums] = useState([]);
  const [newReleaseImgs, setNewReleaseImgs] = useState([]);
  const [newReleaseHrefs, setNewReleaseHrefs] = useState([]);

  const [hotHitArtists, setHotHitArtists] = useState([]);
  const [hotHitAlbumImgs, setHotHitAlbumImgs] = useState([]);
  const [hotHitTrackName, setHotHitTrackName] = useState([]);
  const [hotHitHref, setHotHitHref] = useState([]);

  const [relArtistImgs, setRelArtistImgs] = useState([]);
  const [relArtistNames, setRelArtistNames] = useState([]);
  const [relArtistHref, setRelArtistHref] = useState([]);

  const [songRecImg, setSongRecImg] = useState([]);
  const [songRecArtistName, setSongRecArtistName] = useState([]);
  const [songRecName, setSongRecName] = useState([]);
  const [songRecHref, setSongRecHref] = useState([]);

  // can make specific selections based on country, cache data received so it doesn't
  // keep requery the data if it was already viewed

  // separate useEffect just for profile since it will never change

  // set users top information in the same as it will change based upon the length short, med, long.
  // can cache this info too so they don't always request the same data from endpoints
  useEffect(() => {
    fetch('/api/topArtists').then((res) => {
      res.json().then((apiData) => {
        setTopArtistImg(apiData.artistImages);
        setTopArtists(apiData.artistName);
        setTopGenres(apiData.topGenres);
        setTopGenreData(apiData.topGenreDataSorted);
      });
    });

    fetch('/api/topTracks').then((res) => {
      res.json().then((apiData) => {
        setTopTrackArtistNames(apiData.topTrackArtistNames);
        setTopTrackNames(apiData.topTrackNames);
        setTopTrackImgs(apiData.topTrackAlbumImgs);
      });
    });
  }, []);

  // // lets keep everything separate so they way we don't do multiple pings to api
  // // just because they update the variable in a separate selection
  // // can add feature to change based on selected country, give a list of countries
  // useEffect(() => {
  //   fetch('/api/featuredPlaylists').then((res) => {
  //     res.json().then((apiData) => {
  //       setFeatPlaylistHref(apiData.featPlaylistHref);
  //       setFeatPlaylistImg(apiData.featPlaylistImg);
  //       setFeatPlaylistName(apiData.featPlaylistName);
  //     });
  //   });
  // }, []);

  // // // can get new releases for a country,
  // useEffect(() => {
  //   fetch('/api/newReleases').then((res) => {
  //     res.json().then((apiData) => {
  //       setNewReleaseAlbums(apiData.newReleaseAlbums);
  //       setNewReleaseArtists(apiData.newReleaseArtistName);
  //       setNewReleaseImgs(apiData.newReleaseImgs);
  //       setNewReleaseHrefs(apiData.newReleaseHref);
  //     });
  //   });
  // }, []);

  // // // can get hot hits or top hits for country, but need to get featured playlists for a country
  // // // parse the data for titles containing top / hits/ hot and then run that through the hot hits endpoint
  // useEffect(() => {
  //   fetch('/api/hotHits').then((res) => {
  //     res.json().then((apiData) => {
  //       setHotHitAlbumImgs(apiData.hotHitAlbumImgs);
  //       setHotHitArtists(apiData.hotHitArtists);
  //       setHotHitTrackName(apiData.hotHitTrackName);
  //       setHotHitHref(apiData.hotHitHref);
  //     });
  //   });
  // }, []);

  // // // need to add another endpoint to look up artists and allow people to choose
  // useEffect(() => {
  //   fetch('/api/artistRecs').then((res) => {
  //     res.json().then((apiData) => {
  //       setRelArtistImgs(apiData.relArtistImgs);
  //       setRelArtistNames(apiData.relArtistNames);
  //       setRelArtistHref(apiData.relArtistHref);
  //     });
  //   });
  // }, []);

  // // // need to modify endpoint to take custom parameters like artist, genres, and tracks
  // useEffect(() => {
  //   fetch('/api/songRecs').then((res) => {
  //     res.json().then((apiData) => {
  //       setSongRecArtistName(apiData.songRecArtistName);
  //       setSongRecImg(apiData.songRecImg);
  //       setSongRecName(apiData.songRecName);
  //       setSongRecHref(apiData.songRecHref);
  //     });
  //   });
  // }, []);

  // const topTrackContent = () => {
  //   const topTracksArray = [];
  //   for (let i = 0; i < topArtists.length; i++) {
  //     topTracksArray.push(
  //       <div className=" text-white text-center ">
  //         <img src={topTrackImgs[i]} className="album_img"></img>
  //         <div className="text-lg">{topTrackNames[i]}</div>
  //         <div className="text-base">{topTrackArtistNames[i]}</div>
  //       </div>
  //     );
  //   }
  //   return topTracksArray;
  // };

  // const topArtistContent = () => {
  //   const topArtistArray = [];
  //   for (let i = 0; i < topArtists.length; i++) {
  //     topArtistArray.push(
  //       <div className=" text-white text-center ">
  //         <img src={topArtistImg[i]} className="album_img"></img>
  //         <div className="text-lg mt-2">{topArtists[i]}</div>
  //       </div>
  //     );
  //   }
  //   return topArtistArray;
  // };

  // const featPlaylistContent = () => {
  //   const featPlaylistArray = [];
  //   for (let i = 0; i < featPlaylistName.length; i++) {
  //     featPlaylistArray.push(
  //       <div className=" text-white text-center ">
  //         <a href={featPlaylistHref[i]} target="_blank" rel="noreferrer">
  //           <img src={featPlaylistImg[i]} className="album_img" />
  //         </a>
  //         <div className="text-lg">{featPlaylistName[i]}</div>
  //       </div>
  //     );
  //   }
  //   return featPlaylistArray;
  // };

  // const newReleaseContent = () => {
  //   const newReleaseArray = [];
  //   for (let i = 0; i < newReleaseAlbums.length; i++) {
  //     newReleaseArray.push(
  //       <div className=" w-[25vh]">
  //         <div className=" text-white text-center ">
  //           <a href={newReleaseHrefs[i]} target="_blank" rel="noreferrer">
  //             <img src={newReleaseImgs[i]} className="album_img" />
  //           </a>
  //           <div className="text-lg">{newReleaseAlbums[i]}</div>
  //           <div className="text-base">{newReleaseArtists[i]}</div>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return newReleaseArray;
  // };

  // const hotHitContent = () => {
  //   const hotHitArray = [];
  //   for (let i = 0; i < hotHitAlbumImgs.length; i++) {
  //     hotHitArray.push(
  //       <div className=" text-white text-center ">
  //         <a href={hotHitHref[i]} target="_blank" rel="noreferrer">
  //           <img src={hotHitAlbumImgs[i]} className="album_img" />
  //         </a>
  //         <div className="text-lg">{hotHitTrackName[i]}</div>
  //         <div className="text-base">{hotHitArtists[i]}</div>
  //       </div>
  //     );
  //   }
  //   return hotHitArray;
  // };
  // const relArtistContent = () => {
  //   const relArtistArray = [];
  //   for (let i = 0; i < relArtistImgs.length; i++) {
  //     relArtistArray.push(
  //       <div className=" text-white text-center ">
  //         <a href={relArtistHref[i]} target="_blank" rel="noreferrer">
  //           <img src={relArtistImgs[i]} className="album_img" />
  //         </a>
  //         <div className="text-lg">{relArtistNames[i]}</div>
  //       </div>
  //     );
  //   }
  //   return relArtistArray;
  // };

  // const songRecContent = () => {
  //   const songRecArray = [];
  //   console.log(songRecArtistName);
  //   for (let i = 0; i < songRecArtistName.length; i++) {
  //     songRecArray.push(
  //       <div className="w-[25vh]">
  //         <div className=" text-white text-center ">
  //           <a href={songRecHref[i]} target="_blank" rel="noreferrer">
  //             <img src={songRecImg[i]} className="album_img" />
  //           </a>
  //           <div className="text-lg">{songRecName[i]}</div>
  //           <div className="text-base">{songRecArtistName[i]}</div>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return songRecArray;
  // };
  return (
    <div className=" mx-14 bg-blue-900 home_body overflow-auto">
      <div className="text-start pt-10 px-10 flex flex-wrap justify-around gap-10">
        {/* {topTrackContent()} */}
        {/* {topArtistContent()} */}
        {/* {featPlaylistContent()} */}
        {/* {newReleaseContent()} */}
        {/* {hotHitContent()} */}
        {/* {relArtistContent()} */}
        {/* {songRecContent()} */}
      </div>
    </div>
  );
};

export default Display;
