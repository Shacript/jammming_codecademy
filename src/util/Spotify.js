const clientId = "ffabacac768a4224a47ba7b7c09bf3b5";
const redirectUri = "http://sha_jamming.surge.sh";

let accessToken = localStorage.getItem("accessToken");
let expiresAt = localStorage.getItem("expiresAt");

const Spotify = {
  getAccessToken() {
    if (expiresAt && expiresAt < new Date().getTime()) {
      accessToken = null;
      expiresAt = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("expiresAt");
    }
    if (accessToken) {
      return accessToken;
    }
    
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      localStorage.setItem("accessToken", accessToken);
      const expiresAt = new Date().getTime() + Number(expiresInMatch[1]) * 1000;
      localStorage.setItem("expiresAt", expiresAt);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        const results = jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          preview_url: track.preview_url
        }));
        return results
      });
  },
  savePlaylist(name, trackUris) {
    if (!name || !trackUris) return;
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;
