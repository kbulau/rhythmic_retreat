const TopBarLength = ({setLengthQuery, view}) => {
  const options = {
    topTracks: 'Top Tracks',
    topArtists: 'Top Artists',
    topGenres: 'Top Genres',
  };
  const handleSelectChange = (selectedValue) => {
    switch (selectedValue) {
      case '2':
        setLengthQuery('short_term');
        break;
      case '1':
        setLengthQuery('medium_term');
        break;
      case '0':
        setLengthQuery('long_term');
        break;
      default:
      // Handle other cases or do nothing
    }
  };

  return (
    <div className="mx-14 p-2 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
      <div className="text-center text-white ">{options[view]}</div>
      <div className="text-center">
        <select
          className="ui dropdown"
          onChange={(e) => handleSelectChange(e.target.value)}>
          <option value="">Select History</option>
          <option value="2">Short Term</option>
          <option value="1">Medium Term</option>
          <option value="0">Long Term</option>
        </select>
      </div>
    </div>
  );
};

export default TopBarLength;
