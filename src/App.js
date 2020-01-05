import React from 'react';

import './App.css';
import Artist from './components/artist/artist.component';
import Songs from './components/songs/songs.component';

const API_ADRESS = 'https://spotify-api-wrapper.appspot.com';

class App extends React.Component {
	state = { artistQuery: '', artist: null, tracks: [] };
	updateArtistQuery = event => {
		this.setState({ artistQuery: event.target.value });
	};
	searchArtist = () => {
		fetch(`${API_ADRESS}/artist/${this.state.artistQuery}`)
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
	handleKeyPress = event => {
		// console.log(event.key);
		if (event.key === 'Enter') {
			this.searchArtist();
		}
	};

	render() {
		console.log(this.state);

		return (
			<div className="App">
				<h2>Wyszukiwarka muzy</h2>
				<input
					onChange={this.updateArtistQuery}
					onKeyPress={this.handleKeyPress}
					placeholder="znajdz muzę"
				></input>
				<button onClick={this.searchArtist}>Szukaj</button>
				<Artist artist={this.state.artist} />
				<Songs tracks={this.state.tracks}/>
 			</div>
		);
	}
}

export default App;
