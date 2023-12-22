const TopBarLength = ({setLengthQuery, view}) => {
  const options = {
    topTracks: 'Top Tracks',
    topArtists: 'Top Artists',
  };
  return (
    <div className="mx-14 p-2 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
      <div className="text-center text-white ">{options[view]}</div>
      <div className="text-center">
        <select className="ui dropdown">
          <option value="">Select History</option>
          <option value="2" onClick={() => setLengthQuery('short_term')}>
            Short Term
          </option>
          <option value="1" onClick={() => setLengthQuery('medium_term')}>
            Medium Term
          </option>
          <option value="0" onClick={() => setLengthQuery('long_term')}>
            Long Term
          </option>
        </select>
      </div>
    </div>
  );
};

export default TopBarLength;
