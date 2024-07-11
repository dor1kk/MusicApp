import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay } from 'react-icons/fa';
import config from '../config';

const TopSongs = ({ onSongClick, setCurrentlyPlayingSong }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientId = config.clientId; 
      const clientSecret = config.clientSecret; 
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      const playlistId = '37i9dQZEVXbMDoHDwVN2tF'; 

      try {
        const tokenResponse = await axios.post(
          tokenUrl,
          new URLSearchParams({
            grant_type: 'client_credentials',
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
          }
        );

        const accessToken = tokenResponse.data.access_token;

        const songsResponse = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSongs(songsResponse.data.items.slice(0, 10).map(item => item.track)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePlayClick = (song) => {
    setCurrentlyPlayingSong(song);
    onSongClick(song.uri);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Top Songs
        <span className="ml-2 inline-block px-2 py-1 text-xs font-medium leading-none text-red-700 bg-red-100 rounded-full">
          New
        </span>
      </h2>
      <ul role="list" className="divide-y divide-gray-100">
        {songs.slice(0,5).map((song) => (
          <li
            key={song.id}
            className="flex justify-between gap-x-6 py-5 cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => handlePlayClick(song)}
          >
            <div className="flex min-w-0 gap-x-4 p-2">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={song.album.images[0]?.url ?? 'https://via.placeholder.com/150'}
                alt={song.name}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{song.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {song.artists.map((artist) => artist.name).join(', ')}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 p-3 sm:flex sm:flex-col sm:items-end">
              <button className="bg-red-100 text-red-600 rounded-full p-2">
                <FaPlay />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSongs;
