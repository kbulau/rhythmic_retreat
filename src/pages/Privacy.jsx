import HomeHeader from '../components/HomeHeader';

const Privacy = () => {
  return (
    <div className="background h-screen flex  flex-col items-center">
      <HomeHeader />
      <div className="bg-slate-400  bg-opacity-90 lg:w-[40%] mt-20 rounded-3xl py-10 px-20">
        <p className="font-medium">What do I do with your data?</p>
        <p>
          <span className="font-bold">Absolutely nothing!</span> <br /> I
          don&apos;t store it, sell it, or anything. I also won&apos;t email you
          or try to contact you in any form. The app was made purely for fun
          without any intentions of monetization.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
