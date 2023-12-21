const TopBarLength = () => {
  return (
    <div className="mx-14 p-2 bg-blue-900 rounded-t-3xl border-b-gray-500 border-solid border-t-0 border-r-0 border-l-0  text-start px-10 ">
      <div className="text-center text-white ">Top Artists</div>
      <div className="">
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

export default TopBarLength;
