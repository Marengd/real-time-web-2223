const axios = require('axios');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken = '';

async function requestAccessToken() {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    data: 'grant_type=client_credentials',
  });

  accessToken = response.data.access_token;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomTrack(playlistId) {
  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: { 'Authorization': 'Bearer ' + accessToken },
  });
  const tracks = response.data.items;
  const tracksWithPreview = tracks.filter(item => item.track.preview_url);

  if (tracksWithPreview.length > 0) {
    const randomIndex = getRandomInt(0, tracksWithPreview.length - 1);
    const track = tracksWithPreview[randomIndex].track;
    return {
      id: track.id,
      name: track.name,
      preview_url: track.preview_url,
      artist: track.artists[0].name,
    };
  } else {
    throw new Error('No tracks with previews found in the specified playlist.');
  }
}

async function getRandomArtists(correctArtist) {
  const searchTerm = 'abcdefghijklmnopqrstuvwxyz'[getRandomInt(0, 25)];
  const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=50`, {
    headers: { 'Authorization': 'Bearer ' + accessToken },
  });
  const artists = response.data.artists.items;
  const randomArtists = new Set([correctArtist]);
  while (randomArtists.size < 4) {
    randomArtists.add(artists[getRandomInt(0, artists.length - 1)].name);
  }
  return Array.from(randomArtists);
}

module.exports = {
  requestAccessToken,
  getRandomTrack,
  getRandomArtists,
};

module.exports.accessToken = () => accessToken;
