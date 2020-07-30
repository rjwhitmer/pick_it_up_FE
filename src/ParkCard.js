import React from 'react'
import ParkEventForm from './ParkEventForm'
import './App.css';
import { render } from '@testing-library/react';

export default class ParkCard extends React.Component{
    state = {
        parkForm: false,
        parkEvents: []
    }

    showEvents = () => {
        return this.props.park.events.map(event => {
            return (
                <div>
                    <div className='park-event'>
                        <h4>What are we playing?</h4>
                        <h5>{this.handleCapitalize(event.sport)}</h5>
                        <h5>Players Needed: {event.players}</h5>
                        <button 
                            className='delete-event' 
                            onClick={this.props.handleDelete}
                            value={event.id}
                            id={this.props.park.id}
                        >X</button>
                    </div>
                </div>
            )
        })
    }

    handleCapitalize = (string) => {
        return string.charAt([0]).toUpperCase() + string.slice([1])
    }

    handleAddEventForm = () => {
        this.showEvents()
        this.setState({parkForm: !this.state.parkForm})
    }

    handleAddEvent = (newEvent) => {
        console.log(newEvent)
    }

    render(){   
        return (
            <div className='park-card'>
                <h5>{this.props.park.text}</h5>
                <h3>Upcoming Events!</h3>
                {this.showEvents()}
                <button onClick={this.handleAddEventForm}>Add an Event!</button>
                {(!this.state.parkForm)
                  ? null
                  :<ParkEventForm 
                    park={this.props.park} 
                    key={this.props.park.id} 
                    handleAddEventForm={this.handleAddEventForm}
                    handleAddEvent={this.props.handleAddEvent}
                  />
                }
            </div>
        )
    }
}