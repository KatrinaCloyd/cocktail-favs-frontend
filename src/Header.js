import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <h1>I NEED A DRINK!</h1>
                <div className='linklist'>
                    <NavLink to="/cocktail-search">Find A Cocktail</NavLink>
                    <NavLink to="/favorite">Your Favorite Cocktails</NavLink>
                    <NavLink to="/login">Log In / Sign Up</NavLink>
                    <NavLink onClick={this.props.handleLogout} to="/">Sign Out</NavLink>
                </div>
            </div>
        )
    }
}
