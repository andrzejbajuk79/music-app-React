import React, { Component } from 'react';

class Search extends Component {
	state = { artistQuery: '' };
	updateArtistQuery = event => {
		this.setState({ artistQuery: event.target.value });
	};
	handleKeyPress = event => {
		// console.log(event.key);
		if (event.key === 'Enter') {
			this.searchArtist();
		}
	};

	searchArtist = () => {
		this.props.searchArtist(this.state.artistQuery);
	};
	render() {
		return (
			<div>
				<input
         
					onChange={this.updateArtistQuery}
					onKeyPress={this.handleKeyPress}
					placeholder="znajdz muzę"
				></input>
				<button onClick={this.searchArtist} >
					Szukaj
				</button>
			</div>
		);
	}
}

export default Search;
