import HomeHeader from '../components/HomeHeader';

const ErrorPage = () => {
  return (
    <div className="background h-screen flex  flex-col items-center">
      <HomeHeader />
      <div className="bg-slate-400  bg-opacity-90 lg:w-[40%] mt-20 rounded-3xl p-10 font-medium">
        <p>Hello!</p>
        <p>
          You must&apos;ve gotten lost.
          <br /> Feel free to redirect back home at the top.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
