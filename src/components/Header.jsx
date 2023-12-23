import {useEffect, useState} from 'react';

const Header = () => {
  const [user, setUser] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    fetch('/api/profile').then((res) => {
      res.json().then((data) => {
        const name = data.display_name;
        setUser(data.display_name.charAt(0).toUpperCase() + name.slice(1));
        setProfilePic(data.images[0].url);
      });
    });
  }, []);

  return (
    <header className="flex justify-between h-16 items-center border-slate-600 mx-14 mb-6">
      <div className="flex text-slate-400">Hello {user}</div>
      <div className="flex items-center gap-8 text-slate-400">
        <div className="">
          <i className="fa-solid fa-bell fa-sm"></i>
        </div>

        <img src={profilePic} className="object-cover rounded-full h-10" />
      </div>
    </header>
  );
};

export default Header;
