import {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
const TopBarArtists = ({setArtistRecID}) => {
  // const [selectedArtist, setselectedArtist] = useState('');
  const [inputArtist, setInputArtist] = useState('');
  // future feature add custom selection to make sure correct artist
  //
  // const [inputImgs, setInputImgs] = useState([]);
  // const [inputNames, setInputNames] = useState([]);
  // const [inputIDs, setInputIDs] = useState([]);
  // const [inputArtistID, setInputArtistID] = useState('');
  const getListOfArtists = () => {
    fetch(`/api/findArtist?artist=${encodeURIComponent(inputArtist)}`).then(
      (res) => {
        res.json().then((apiData) => {
          // future feature add custom selection to make sure correct artist
          //
          // setInputNames(apiData.artistNames);
          // setInputImgs(apiData.artistImgs);
          setArtistRecID(apiData.artistIDs[0]);
        });
      }
    );
  };

  return (
    <div className="mx-14 p-2 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
      <div className="text-center text-white pb-2">Artist Recs</div>
      <Form className="flex align-center items-center justify-center">
        <input
          type="text"
          placeholder="Enter Artist"
          onInput={(e) => setInputArtist(e.target.value)}
          name="title"
        />
        <Button className="h-fit" onClick={() => getListOfArtists()}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TopBarArtists;
