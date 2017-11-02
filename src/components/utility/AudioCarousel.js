import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class AudioCarousel extends Component {
  render() {
    console.log(this.props.tracks);
    return (
      <Carousel showThumbs={false}>
        {this.props.tracks.map(track => (
          <div className="userShowCarousel" key={track.track.id}>
            <h4>Track Name: <strong>{track.track.name}</strong></h4>
            <p> Artists: {track.track.artists[0].name}</p>
            {track.track.preview_url && <audio className="carousel-audio" controls>
              <source src={track.track.preview_url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>}
          </div>
        ))}
      </Carousel>
    );
  }
}

export default AudioCarousel;
