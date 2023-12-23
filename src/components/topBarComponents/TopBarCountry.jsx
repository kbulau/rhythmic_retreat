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
    featPlaylists: 'Featured Playlists',
    newReleases: 'New Releases',
  };

  return (
    <div className="mx-14 p-2 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
      <div className="text-center text-white ">{options[view]}</div>
      <div className="flex flex-col items-center justify-center">
        <div className=" relative">
          <div className="">
            <input
              type="text"
              value={inputCountry}
              placeholder="Enter Country"
              onChange={(e) => setInputCountry(e.target.value)}
              className="w-[15vw]"></input>
          </div>
          <div className="mt-[-3px] absolute z-50 top-full left-0 bg-white border border-gray-300 w-[15vw]">
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
              .slice(0, 5)
              .map((el) => (
                <div
                  className="p-2 text-center text-base cursor-pointer hover:bg-slate-300"
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
    </div>
  );
};

export default TopBarCountry;
