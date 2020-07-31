import React from 'react'
import { FaBolt } from 'react-icons/fa'
import Axios from 'axios';
import './App.css';
const mapAPI = 'https://maps.googleapis.com/maps/api/geocode/json'


export default class MapMarker extends React.Component{
    state = {
        showInfoWindow: false
    };

    handleMouseOver = e => {
        e.stopPropagation()
        this.setState({
            showInfoWindow: true
        });
    };

    handleMouseExit = e => {
        e.stopPropagation()
        this.setState({
            showInfoWindow: false
        });
    };

    handleTargetClick = e => {
        e.stopPropagation()
        this.props.handleClick(this.props)
    }

    render(){
        const { text, events } = this.props
        return (
            <div
                onMouseEnter={this.handleMouseOver} 
                onMouseLeave={this.handleMouseExit}
                onClick={this.handleTargetClick}>
                <FaBolt />
                {this.state.showInfoWindow && (
                    <div className="map-card">
                        <h4>{text}</h4>
                        <h4>Upcoming Events! {events.length}</h4>
                    </div>
                )}
            </div>
        )}
}