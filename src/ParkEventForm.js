import React from 'react'
const eventURL = 'http://localhost:3000/sporting_events/'

export default class ParkEventForm extends React.Component{
    state = {
        sport: "",
        numberOfPlayers: 0,
        date: "",
        time: "",
    }

    handleSportChange = (event) => {
        event.stopPropagation()
        this.setState({
            sport: event.target.value
        })
    }

    handlePlayerChange = (event) => {
        event.stopPropagation()
        this.setState({
            numberOfPlayers: event.target.value
        })
    }

    handleDateChange = (event) => {
        event.stopPropagation()
        this.setState({
            date: event.target.value
        })
    }

    handleTimeChange = (event) => {
        event.stopPropagation()
        this.setState({
            time: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const parkID = this.props.park.$dimensionKey
        fetch(eventURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sport: this.state.sport,
                players: this.state.numberOfPlayers,
                event_date: this.state.date,
                event_time: this.state.time,
                park_id: parkID
            })
        })
        .then(response => response.json())
        .then(newEvent => this.props.handleAddEvent(newEvent))
        .then(this.props.handleAddEventForm())
    }
    
    render() {
        return (
            <div>
                <form className='event-form'>
                    <h3>Pick it up!</h3>
                    <h6>Sport:</h6>
                    <input 
                        type='text' 
                        name='sport' 
                        onChange={this.handleSportChange}
                    />
                    <h6>Number of Players:</h6>
                    <input 
                        type='number' 
                        name='players'
                        onChange={this.handlePlayerChange}
                    />
                    <h6>Date:</h6> 
                    <input 
                        type='date'
                        name='date'
                        onChange={this.handleDateChange}
                    />
                    <h6>Time:</h6>
                    <input
                        type='time'
                        name='time'
                        onChange={this.handleTimeChange}
                    />
                    <button type='submit' onClick={this.handleSubmit}>Let's Play!</button>
                </form>
            </div>
        )
    }
}