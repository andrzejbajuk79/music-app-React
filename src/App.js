import React from 'react';

import './App.css';
import Artist from './components/artist/artist.component';
import Songs from './components/songs/songs.component';
import Search from './components/search/search.component';
const API_ADRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends React.Component {
	state = { artist: null, tracks: [] };
	componentDidMount() {
		this.searchArtist('bach');
	}
	searchArtist = artistQuery => {
		fetch(`${API_ADRESS}/artist/${artistQuery}`)
			.then(response => response.json())
			.then(json => {
				if (json.artists.total > 0) {
					const artist = json.artists.items[0];
					// console.log('artist',artist);
					this.setState({ artist: artist });
					fetch(`${API_ADRESS}/artist/${artist.id}/top-tracks`)
						.then(response => response.json())
						.then(json => this.setState({ tracks: json.tracks }))
						.catch(error => alert(error.message));
				}
			});
	};

	render() {
		console.log(this.state);

		return (
			<div className="App">
				<h2>Wyszukiwarka muzy</h2>
				<Search searchArtist={this.searchArtist} />
				<Artist artist={this.state.artist} />
				<Songs tracks={this.state.tracks} />
			</div>
		);
	}
}

export default App;
