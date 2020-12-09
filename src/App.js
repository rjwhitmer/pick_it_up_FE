import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
import './App.css';
import Axios from 'axios';
import ParkCard from './ParkCard';
import UserEvents from './UserEvents'
import LoginForm from './LoginForm';

const mapAPI = 'https://maps.googleapis.com/maps/api/geocode/json'
const parkURL = 'http://localhost:3000/parks/'
const deleteURL = 'http://localhost:3000/sporting_events/'
const userEventsURL = 'http://localhost:3000/user_events'
const deleteUserEventsURL = 'http://localhost:3000/user_events'
const userURL = `http://localhost:3000/users/`

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
    userEvents: [],
    login: false,
  };

  showMap = () => {
    return <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyBUcpC0j7O6sKR5yAVVrKCsH08NSSqcQr0' }}
      defaultCenter={this.state.center}
      defaultZoom={this.state.zoom}
      yesIWantToUseGoogleMapApiInternals
    >
      {this.showMarker()}
      
    </GoogleMapReact>
  }

  getCoordinate = (event) => {
    event.preventDefault()
    Axios.get(mapAPI, {
      params: {
        address: this.state.newMarker, 
        key: 'AIzaSyBFsbA9ExFBxQ-u5bITuD3-vs1_72c85Ww'
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
    if (!location.events)
      return null
    else 
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
    const park = {...this.state.park}
    park.events = filteredEvents
    this.setState({park})

    fetch((deleteURL + eventID), { method: "DELETE" })
  }
  
  handleDeleteUserEvent = (event) => {
    const eventID = event.target.value
    const filteredEvents = this.state.userEvents.filter(event => event.id != eventID)
    this.setState({userEvents: filteredEvents})

    fetch((deleteUserEventsURL + eventID), { method: "DELETE" })
  }

  handleRsvp = (event) => {
    const eventID = event.target.value
    const userID = window.value
    fetch(userEventsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userID,
        event_id: eventID
      })
    })
    // .then(response => response.json())
    .then(this.getUserEvents())
  }

  getUserEvents = () => {
    const userID = window.value
    fetch((userURL + userID), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => this.updateUserEvents(data))
  }

  updateUserEvents = (user) => {
    const userEvents = user.sporting_events
    this.setState({ userEvents })
  }

  showUserEvents = () => {
    return (<div className='user-events-container'>
              <UserEvents 
                events={this.state.userEvents}
                handleDelete={this.handleDeleteUserEvent}
              />
            </div>
    )}

  showAddMarkerForm = () => {
    return (<form className='add-marker-form'> 
              <label>Don't see your park?</label>
              <input 
                type="text"
                name="address"
                onChange={this.handleNewMarker}
              />
              <button onClick={this.getCoordinate}>Find My Playground!</button>
            </form>)
  }

  showParkCard = () => {
    return (
      <ParkCard 
        park={this.state.park} 
        handleDelete={this.handleDelete}
        handleAddEvent={this.handleAddEvent}
        handleRsvp={this.handleRsvp}
      /> 
    )
  }

  handleLogOut = () => {
    window.localStorage.clear()
    this.setState({ login: !this.state.login })
  }

  handleLogIn = () => {
    this.setState({ login: !this.state.login })
    this.getUserEvents()
  }

  render() {
    if (!localStorage.getItem('token'))
      return <LoginForm handleLogIn={this.handleLogIn}/>
    else
      // if (this.state.marker.length > 1)
      return (<>
                <button 
                  className='log-out' 
                  onClick={this.handleLogOut}
                >Log-out</button>
                {/* <h2>My games!</h2>
                {this.showUserEvents()} */}
                <div className='App'>
                  {(this.state.park.text) 
                  ? <>
                      {this.showParkCard()}
                    </>
                    : null}
                  <div className='map' >
                    {this.showMap()}
                    {this.showAddMarkerForm()}
                  </div>
                </div>
              </>
      );
      // else return null
  }
}
 
export default SimpleMap;