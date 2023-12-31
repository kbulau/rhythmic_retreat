import {Link} from 'react-router-dom';

const HomeHeader = () => {
  return (
    <div className="flex justify-center items-center h-[8%]">
      <header className="bg-slate-400 bg-opacity-70 h-[100%] w- flex justify-center items-center gap-20 border-none  px-10 rounded-lg">
        <Link to="/">
          <button className=" px-4 w-20 h-10 border-none rounded-lg font-bold bg-sky-300 bg-opacity-70 cursor-pointer">
            Home
          </button>
        </Link>
        <Link to="/about">
          <button className=" px-4 w-20 h-10 border-none rounded-lg font-bold bg-sky-300 bg-opacity-70 cursor-pointer">
            About
          </button>
        </Link>
        <Link to="/privacy">
          <button className=" px-4 w-20 h-10 border-none rounded-lg font-bold bg-sky-300 bg-opacity-70 cursor-pointer">
            Privacy
          </button>
        </Link>
        <Link to="https://www.linkedin.com/in/kurt-bulau/" target="_blank">
          <button className="px-4 h-10 border-none rounded-lg font-bold bg-sky-300 bg-opacity-70 cursor-pointer">
            Linkedin
          </button>
        </Link>
      </header>
    </div>
  );
};

export default HomeHeader;
