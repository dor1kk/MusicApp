import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';


const SongList = ({ searchTerm, onSongClick, setCurrentlyPlayingSong }) => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const clientId = config.clientId;
        const clientSecret = config.clientSecret
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      console.log("cli",clientId, clientSecret)
      const searchUrl = 'https://api.spotify.com/v1/search';
      const market = 'AL'; 

      try {
        // Fetch access token
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

        const songsResponse = await axios.get(searchUrl, {
          params: {
            q: searchTerm,
            type: 'track',
            limit: 40,
            market: 'AL',
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSongs(songsResponse.data.tracks.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const handlePlayClick = (song) => {
    setSelectedSong(song);
    setCurrentlyPlayingSong(song);
    onSongClick(song.uri);
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"><span className='text-2xl font-bold'>+</span> Create Playlist</button>
        <div className="flex items-center space-x-2">
  <label htmlFor="sort-by" className="text-sm font-medium text-red-600">Sort by:</label>
  <div className="relative">
    <select
      id="sort-by"
      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
    >
      <option value="popularity">Popularity</option>
      <option value="name">Name</option>
      <option value="artist">Artist</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10.293 12.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
        />
      </svg>
    </div>
  </div>
</div>


      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="relative p-2 bg-white rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow"
            onClick={() => handlePlayClick(song)}
          >
            <img
              src={song.album.images[0]?.url ?? 'https://via.placeholder.com/150'}
              alt={song.name}
              className="w-full h-[220px] md:h-[160px] rounded-lg object-cover"
            />
            <div className="mt-2 px-2">
              <p className="font-semibold text-gray-900">{song.name}</p>
              <p className="text-sm text-gray-500">{song.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
