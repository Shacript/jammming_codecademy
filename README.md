# Final React frontend ( Jammming ) practice project from Codecademy
## https://www.codecademy.com/learn/paths/build-web-apps-with-react
Create react that make spotify playlist for you .

Just Search , Add , Rename , Submit .

This is project that use spotify api !

Hosting frontend with SURGE
### Demo https://sha_jamming.surge.sh
Currently Spotify API is still in Development mode . There might can't use on Demo

But ! You guys can clone this project and change ClientId,RedirectURI (src/util/Spotify.js) to your Spotify API !

## To-Do Feature: (do without tutorial)
- [x] Include preview samples for each track
- [x] Only display songs not currently present in the playlist in the search results
- [x] Add a loading screen while playlist is saving
- [x] Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
- [x] After user redirect on login, restoring the search term from before the redirect
- [x] Ensure playlist information doesn’t get cleared if a user has to refresh their access token
