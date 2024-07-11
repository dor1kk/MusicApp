import React, { useState } from 'react';
import { Link, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SongList from '../components/Songlist'; 
import Footer from '../components/Footer';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import Search from '../components/Search';
import TopSongs from '../components/TopSongs';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('Music');
;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const addToPlaylist = (song) => {
    setPlaylist([song]);
  };

  return (
    <div className="flex flex-col h-screen bg-white transition-height duration-75 ease-out">
      <div className="flex md:hidden flex-row p-2 w-full  justify-between items-center shadow-md z-10">
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
        <Link to="/">
          <img src='https://static.vecteezy.com/system/resources/previews/000/579/872/non_2x/music-symbols-logo-and-icons-template-vector.jpg' alt="logo" className="w-28" />
        </Link>
        <Link to={``}>
          <img src='/path-to-your-user-pic.png' alt="user-pic" className="w-9 h-9 rounded-full" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed md:hidden w-3/5 bg-[#FFFBF7] h-screen overflow-y-auto shadow-md z-20 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} />
        </div>
      )}
      <div className="flex flex-row h-full">
        <div className="hidden md:flex h-full flex-initial">
          <Sidebar />
        </div>
        <div className="flex flex-1 h-full flex-col overflow-y-auto p-4">
            <Search onSearch={handleSearch} />
            <SongList
          searchTerm={searchTerm}
          setCurrentlyPlayingSong={setCurrentlyPlayingSong}
        />        </div>
        <div className="hidden md:flex h-full w-[300px]">
          <TopSongs />
        </div>
      </div>
      <Footer currentlyPlayingSong={currentlyPlayingSong} /> 
    </div>
  );
};

export default Home;
