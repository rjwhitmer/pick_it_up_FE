import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import './App.css';
import Axios from 'axios';
import ParkCard from './ParkCard';
import ParkEventForm from './ParkEventForm'

const mapAPI = 'https://maps.googleapis.com/maps/api/geocode/json'
const parkURL = 'http://localhost:3000/parks/'
const deleteURL = 'http://localhost:3000/sporting_events/'

class SimpleMap extends Component {
  state = {
    center: {
      lat: 39.73,
      lng: -104.99
    },
    zoom: 11,
    marker: [],
    park: [],
    parkForm: false,
    newMarker: [],
  };

  getCoordinate = (event) => {
    event.preventDefault()
    console.log(event.target)
    Axios.get(mapAPI, {
      params: {
        address: this.state.newMarker, 
        key: process.env.REACT_APP_GEOCODER_API_KEY
      }
    })
    .then(response => this.createNewMarker(response))
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
                handleClick={this.handleClick}
                key={location.id} 
                lat={location.latitude}
                lng={location.longitude}
                text={location.name}
                events={location.sporting_events}
              />
      })
  }

  createNewMarker = (data) => {
    const locationName = data.data.results[0].address_components[0].long_name
    const coordinates = data.data.results[0].geometry.location
    fetch(parkURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: locationName,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      }),
    })
    .then(response => response.json())
    .then(data => this.showNewMarker(data))
  }

  showNewMarker = (location) => {
    this.setState({ marker: [...this.state.marker, location]})
  }

  handleClick = (location) => {
    (this.state.park.text === location.text)
    ? this.setState({ park: [] })
    : this.setState({ park: location })
}

  handleAddEvent = (newEvent) => {
    const park = {...this.state.park}
    park.events = [...park.events, newEvent]
    this.setState({park}) 
  }

  handleNewMarker = (event) => {
    event.stopPropagation()
    this.setState({
      newMarker: event.target.value
    })
  }

  handleDelete = (event) => {
    const eventID = event.target.value
    const filteredEvents = this.state.park.events.filter(event => event.id != eventID)
    console.log(this.state.park.events)
    console.log(filteredEvents)
    const park = {...this.state.park}
    park.events = filteredEvents
    this.setState({park})

    fetch((deleteURL + eventID), { method: "DELETE" })
  }
  
  render() {
    if (this.state.marker.length > 1)
    return (
      // Important! Always set the container height explicitly
      <div className='App'>
        {(this.state.park.text) 
        ? <>
            <ParkCard 
              park={this.state.park} 
              handleDelete={this.handleDelete}
              handleAddEvent={this.handleAddEvent}
            /> 
          </>
          : null}
        <div className='map' >
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {this.showMarker()}
            
          </GoogleMapReact>
          <form> 
            <label>Don't see your park?</label>
            <input 
              type="text"
              name="address"
              onChange={this.handleNewMarker}
            />
          <button onClick={this.getCoordinate}>Find My Playground!</button>
          </form>
        </div>
      </div>
    );
    else return null
  }
}
 
export default SimpleMap;