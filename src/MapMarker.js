import React from 'react'
import { Marker, InfoWindow } from 'google-map-react';
import Axios from 'axios';
const mapAPI = 'https://maps.googleapis.com/maps/api/geocode/json'


export default class MapMarker extends React.Component{
    state = {
        showInfoWindow: false
    };

    handleMouseOver = e => {
        this.setState({
            showInfoWindow: true
        });
    };

    handleMouseExit = e => {
        this.setState({
            showInfoWindow: false
        });
    };

    render(){
        const { showInfoWindow } = this.state;
        const markers =  this.props.places.map(place => {
           return (
               <Marker 
                    position={place.latitude, place.longitude}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseExit}>
                        {showInfoWindow && (
                            <InfoWindow>
                                <h4>{place.name}</h4>
                            </InfoWindow>
                        )}
                </Marker>
            //    <div className='map-marker'>
            //        <h4>{name}</h4>
            //        lat={latitude}
            //        lng={longitude}
            //    </div>
           )
        })
        return (
            <>
                {markers}
            </>
        )
   }
}