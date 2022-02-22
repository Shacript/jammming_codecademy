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
  }
  addTrack(track){
    
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
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
