import React from 'react'

export default function UserEvents(props){
    console.log(props)
    const handleDate = (date) => {
        const prettyDate = date.split('-')
        return (`${prettyDate[1]}-${prettyDate[2]}-${prettyDate[0]}`)
    }

    const handleTime = (time) => {
        const prettyTime = new Date(time.split('Z')[0])
        return prettyTime.toLocaleString().split(',')[1]
    }

    const handleCapitalize = (string) => {
        return string.charAt([0]).toUpperCase() + string.slice([1])
    }

    return props.events.map(event => {
        return (
            <div>
                <div className='user-events'>
                    <h5>{handleCapitalize(event.sport)}</h5>
                    <h5>Players Needed: {event.players}</h5>
                    <h5>Date: {handleDate(event.event_date)}</h5>
                    <h5>Time: {handleTime(event.event_time)}</h5>
                    <button 
                        className='delete-event' 
                        onClick={props.handleDelete}
                        value={event.id}
                        // id={props.park.id}
                    >Nevermind</button>
                </div>
            </div>
        )
    })
}