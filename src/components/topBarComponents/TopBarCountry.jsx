import {iso31661} from 'iso-3166';
import {useState} from 'react';
const TopBarCountry = ({setCountry, country, view}) => {
  const [inputCountry, setInputCountry] = useState('');
  const countryCodes = {};
  iso31661.forEach((el) => {
    countryCodes[el.name] = el.alpha2;
  });

  const options = {
    hotHits: 'Hot Hits',
    featPlaylist: 'Featured Playlists',
    newReleases: 'New Releases',
  };

  return (
    <div className="mx-14 p-2 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
      <div className="text-center text-white ">{options[view]}</div>
      <div className="text-center">
        <div>
          <input
            type="text"
            value={inputCountry}
            placeholder="Enter Country"
            onChange={(e) => setInputCountry(e.target.value)}
            className="w-[15vw]"></input>
        </div>
        <div>
          {iso31661
            .filter((el) => {
              const searchTerm = inputCountry.toLowerCase();
              const country = el.name.toLowerCase();
              return (
                searchTerm &&
                country.startsWith(searchTerm) &&
                searchTerm !== country
              );
            })
            .slice(0, 10)
            .map((el) => (
              <div
                className="bg-white text-base mt-[-3px] w-[15vw]"
                onClick={() => {
                  setInputCountry(el.name),
                    setCountry(countryCodes[el.name]),
                    console.log(country);
                }}
                key={el.name}>
                {el.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopBarCountry;
