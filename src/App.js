import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import './App.css';
import Axios from 'axios';
const mapAPI = 'https://maps.googleapis.com/maps/api/geocode/json'
const parkURL = 'http://localhost:3000/parks'
 
// const MapMarker = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  state = {
    center: {
      lat: 39.73,
      lng: -104.99
    },
    zoom: 11,
    marker: []
  };

  getCoordinate = (event) => {
    event.preventDefault()
    console.log(event.target)
  //   Axios.get(mapAPI, {
  //     params: {
  //       address: location, 
  //       key: process.env.REACT_APP_GOOGLE_API_KEY
  //     }
  //   })
  //   .then(response => this.showMarker(response.data.results[0].geometry.location))
  }

  componentDidMount = () => {
    this.getMarkers()
  }

  getMarkers = () => {
      fetch(parkURL)
        .then(response => response.json())
        .then(data => this.setState({marker:(data)}))
  }

  showMarker = () => {
    return this.state.marker.map(location => {
      return <MapMarker 
                lat={location.latitude}
                lng={location.longitude}
                text={location.name}
              />
      })
  }
     
  render() {
    if (this.state.marker.length > 1)
    return (
      // Important! Always set the container height explicitly
      <div className='App'>
        <form> 
          <input 
            type="text"
            name="address"
            onSubmit={this.getCoordinate} 
          />
          <input type='submit' />
        </form>
        <div className='map' >
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            <MapMarker places={this.state.marker} />
            {/* {this.showMarker()} */}
          </GoogleMapReact>
        </div>
      </div>
    );
    else return null
  }
}
 
export default SimpleMap;