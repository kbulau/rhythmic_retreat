import HomeHeader from './components/HomeHeader';

export default function App() {
  return (
    <>
      <div className="background h-screen flex justify-center flex-col">
        <HomeHeader />
        <div className="justify-center flex pt-20 h-screen">
          <div className="bg-slate-400  bg-opacity-70 py-10 lg:w-[50%] h-[50%]  rounded-3xl flex flex-col justify-center items-center">
            <div className="gap-4 mb-[-20px] 2xl:flex 2xl:items-center">
              <i className="fa-solid fa-headphones fa-xl"></i>
              <h1 className="font-[sans]">Rhythmic Retreat</h1>
            </div>

            <div className="">
              <p className="font-[play] mb-4 px-4">
                We use Spotify to give you music suggestions, <br /> show your
                top artists, and more!
              </p>
            </div>
            <button className="w-20 h-10 border-none rounded-lg bg-green-500">
              <a
                href="/api/token"
                className="no-underline text-white font-bold text-base">
                Login
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
