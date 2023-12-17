export default function App() {
  return (
    <>
      <div className="background h-screen pt-20">
        <div className="bg-slate-400  bg-opacity-70 py-10 mx-96 rounded-3xl">
          <div className="flex justify-center items-center gap-4 mb-[-20px] home">
            <i className="fa-solid fa-headphones fa-xl"></i>
            <h1 className="font-[sans]">Rhythmic Retreat</h1>
          </div>

          <div className="">
            <p className="font-[play] mb-4">
              We use Spotify to give you music suggestions, show you your top
              artists,
              <br />
              and more! Just login below.
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
    </>
  );
}
