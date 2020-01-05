import React, { Component } from 'react';

class Songs extends Component {
	//playingPreviuewUrl obsluguje podwojne klikniecie tego samego albumu
	state = { playing: false, audio: null, playingPreviewUrl: null };
	//zeby zaobiec automtycznemu wywolaniu tej funkcji w kodzie JS
	//uzywamy zapisu podwojnego ArrowFunction
	playAudio = previewUrl => () => {
		const audio = new Audio(previewUrl);
		if (!this.state.playing) {
			audio.play();
			this.setState({
				playing: true,
				audio,
				playingPreviewUrl: previewUrl
			});
		} else {
			this.state.audio.pause();
			//jesli klikniemy inne audio chcemy wcisnac pauze na aktulanym co gra
			//jesli klikniemy te  co gra rowniez chcemy pazue
			if (this.state.playingPreviewUrl === previewUrl) {
				this.setState({ playing: false });
			} else {
				//drugie audio klikniete
				audio.play();
				this.setState({ audio, playingPreviewUrl: previewUrl });
			}
		}
	};

	render() {
		const { tracks } = this.props;
		return (
			<div>
				{tracks.map(track => {
					const { id, name, album, preview_url } = track;
					return (
						<div key={id} onClick={this.playAudio(preview_url)}>
							<img
								src={album.images[0].url}
								alt="track-image"
								style={{
									width: 200,
									height: 200,
									objectFit: 'cover'
								}}
							/>
							<p>{name}</p>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Songs;
