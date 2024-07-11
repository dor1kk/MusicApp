import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo } from 'react-icons/fa';
import { FiVolume2 } from 'react-icons/fi';
import { RiHeart3Fill } from 'react-icons/ri';

const Footer = ({ currentlyPlayingSong }) => {
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    if (currentlyPlayingSong) {
      const audio = new Audio(currentlyPlayingSong.preview_url);
      setAudioElement(audio);

      audio.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(audio.duration / 60);
        const durationSeconds = Math.floor(audio.duration % 60);
        setDuration(`${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`);
      });

      const updateTime = () => {
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        setCurrentTime(`${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`);
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.addEventListener('timeupdate', updateTime);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.pause();
      };
    }
  }, [currentlyPlayingSong]);

  const playPauseToggle = () => {
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  const handleForward = () => {
  };

  const handleBackward = () => {
  };

  const handleRandom = () => {
  };

  const handleRepeat = () => {
  };

  return (
    <div className="bg-white border-t border-gray-300 w-full h-20 flex items-center justify-between p-4 fixed bottom-0 left-0">
      <div className="flex items-center">
        <img
          src={currentlyPlayingSong?.album.images[0]?.url ?? 'https://via.placeholder.com/150'}
          alt={currentlyPlayingSong?.name ?? 'No song playing'}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">{currentlyPlayingSong?.name ?? 'No song playing'}</p>
          <p className="text-sm text-gray-500">
            {currentlyPlayingSong?.artists ? currentlyPlayingSong.artists.map((artist) => artist.name).join(', ') : ''}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <FaRandom className="cursor-pointer text-gray-500" onClick={handleRandom} />
          <FaStepBackward className="cursor-pointer text-gray-500" onClick={handleBackward} />
          {audioElement?.paused ? (
            <FaPlay className="cursor-pointer text-gray-500" onClick={playPauseToggle} />
          ) : (
            <FaPause className="cursor-pointer text-gray-500" onClick={playPauseToggle} />
          )}
          <FaStepForward className="cursor-pointer text-gray-500" onClick={handleForward} />
          <FaRedo className="cursor-pointer text-gray-500" onClick={handleRepeat} />
        </div>
        <div className="flex items-center w-full mt-2">
          <span className="text-sm text-gray-500">{currentTime}</span>
          <input
            type="range"
            className="mx-2 flex-1"
            value={progress}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value) * audioElement.duration / 100;
              audioElement.currentTime = newTime;
              setProgress(e.target.value);
            }}
          />
          <span className="text-sm text-gray-500">{duration}</span>
        </div>
      </div>
      <div className="flex items-center space-x-4 hidden sm:flex"> {/* Hide on small screens */}
        <RiHeart3Fill className="cursor-pointer text-gray-500" />
        <div className="flex items-center space-x-2">
          <FiVolume2 className="cursor-pointer text-gray-500" />
          <input type="range" />
        </div>
        <button className="cursor-pointer text-gray-500">...</button>
      </div>
    </div>
  );
};

export default Footer;
