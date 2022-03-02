import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: localStorage.getItem("playlistName") || "New Playlist",
      playlistTracks: JSON.parse(localStorage.getItem("playlistTracks")) || [],
      isSaving: false,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    localStorage.setItem("playlistTracks", JSON.stringify(tracks));
    this.setState({ playlistTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let tracksFilter = tracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    localStorage.setItem("playlistTracks", JSON.stringify(tracksFilter));
    this.setState({
      playlistTracks: tracksFilter,
    });
  }
  updatePlaylistName(name) {
    localStorage.setItem("playlistName", name);
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    if (this.state.playlistTracks.length <= 0) return;
    this.setState({ isSaving: true });
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      localStorage.setItem("playlistName", "New Playlist");
      localStorage.setItem("playlistTracks", JSON.stringify([]));
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
        isSaving: false,
      });
    });
  }
  search(term) {
    Spotify.search(term).then((searchResults) => {
      const notInPlaylist = searchResults.filter((searchResult) => {
        return !this.state.playlistTracks.find(
          ({ id }) => searchResult.id === id
        );
      });
      this.setState({ searchResults: notInPlaylist });
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              updatePlaylistName={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
              isSaving={this.state.isSaving}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
