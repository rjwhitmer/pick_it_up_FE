import React from 'react';
import './App.css';

const loginURL = 'http://localhost:3000/login'
const userURL = 'http://localhost:3000/users'

export default class LoginForm extends React.Component{
    state = {
        name: "",
        password: "",
    }

    handleChange = (event) => {
        event.stopPropagation()
        if (event.target.name === 'name')
            this.setState({ name: event.target.value })
        else
            this.setState({ password: event.target.value })
    }

    storeToken = (data) => {
        if (!data.payload)
            return null
        else 
            window.localStorage.setItem('token', data.token)
            window.value = data.payload.user_id.toString()
            this.props.handleLogIn()
        
    }

    login = (event) => {
        event.preventDefault()
        fetch(loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => this.storeToken(data))
    }

    register = (event) => {
        event.preventDefault()
        fetch(userURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        })
    }

    render() {
        return (
            <div className='login-div'>
                <form className='login-form'>
                    <label>Name:</label>
                    <input 
                        type='text' 
                        name='name' 
                        onChange={this.handleChange} 
                    />
                    <label>Password:</label>
                    <input 
                        type='password' 
                        name='password' 
                        onChange={this.handleChange} 
                    />
                    <button onClick={this.login}>Hup!</button>
                    {(!window.localStorage.getItem('token')) 
                    ? <button onClick={this.register}>Sign me up!</button>
                    : null }
                </form>
            </div>
        )
    }
}