import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: "name1",
          artist: "artist1",
          album: "album1",
        },
        {
          id: 2,
          name: "name2",
          artist: "artist2",
          album: "album2",
        },
        {
          id: 3,
          name: "name3",
          artist: "artist3",
          album: "album3",
        },
      ],
      playlistName: "Test",
      playlistTracks: [
        {
          id: 1,
          name: "name1",
          artist: "artist1",
          album: "album1",
        },
        {
          id: 2,
          name: "name2",
          artist: "artist2",
          album: "album2",
        },
        {
          id: 3,
          name: "name3",
          artist: "artist3",
          album: "album3",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    this.setState({
      playlistTracks: tracks.filter((savedTrack) => savedTrack.id !== track.id),
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
