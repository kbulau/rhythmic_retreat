import HomeHeader from '../components/HomeHeader';

const About = () => {
  return (
    <div className="background h-screen flex  flex-col items-center">
      <HomeHeader />
      <div className="bg-slate-400  bg-opacity-90 lg:w-[40%] mt-20 rounded-3xl p-10 font-medium">
        <p>
          Hello! <br /> I hope you&apos;re doing well! <br />
        </p>
        <p>
          I made this app purely for fun. It&apos;s for my friends and anyone
          else who enjoys music as much as we do. You can get artist/track recs,
          playlists from other countries, and your top artists, tracks, and
          genres. Clicking on any of the images will open it up in spotify. If
          you have anything you want added feel free to message me on linkedin
          and I&apos;ll try and add it. The design isn&apos;t finished, but just
          my mvp. I intend to make it look better in the future!
        </p>
        <p>
          Feel free to read the privacy policy or checkout my linked in.
          Otherwise, you can go back home and login to start.
        </p>
        <p>Thank you for your time!</p>
      </div>
    </div>
  );
};

export default About;
