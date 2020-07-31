import React from 'react'
import './App.css';

export default function EventForm(){
    return (
        <form>
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
    )
}