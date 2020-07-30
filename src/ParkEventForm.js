import React from 'react'
const eventURL = 'http://localhost:3000/sporting_events/'

export default class ParkEventForm extends React.Component{
    state = {
        sport: "",
        numberOfPlayers: 0,
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
                <form>
                    <h3>Pick it up!</h3>
                    <h5>Sport:</h5>
                    <input 
                        type='text' 
                        name='sport' 
                        onChange={this.handleSportChange}
                    />
                    <h5>Number of Players:</h5>
                    <input 
                        type='number' 
                        name='players'
                        onChange={this.handlePlayerChange}
                    />
                    <button type='submit' onClick={this.handleSubmit}>Let's Play!</button>
                </form>
            </div>
        )
    }
}