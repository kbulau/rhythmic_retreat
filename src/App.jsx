// import {useState} from 'react';

import './App.css';

function App() {
  return (
    <>
      <div>Rhythmic Retreat</div>
      <div>
        We use spotify to give you music suggestions, show you your tops
        artists, and more! Just login below.
      </div>
      <div className=" border-stone-100 border-2">
        {' '}
        To access the app you must first login below
      </div>
      <button className="bg-black">
        <a href="/api/token"> click me</a>
      </button>
    </>
  );
}

export default App;
