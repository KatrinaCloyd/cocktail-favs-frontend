import React, { Component } from 'react'
import { signInUser, signUpUser } from './api-utils.js'
import './form.css'

export default class LoginSignUpPage extends Component {
    state = {
        returningEmail: '',
        returningPassword: '',
        newEmail: '',
        newPassword: ''
    }

    handleRetEmailChange = (e) => {
        this.setState({ returningEmail: e.target.value })
    }
    handleRetPasswordChange = (e) => {
        this.setState({ returningPassword: e.target.value })
    }
    handleRetUserSubmit = async (e) => {
        e.preventDefault();
        const user = await signInUser(this.state.returningEmail, this.state.returningPassword);
        const token = user.token;
        this.props.handleUserChange(token);
        this.props.history.push('/cocktail-search');
    }
    handleNewEmailChange = (e) => {
        this.setState({ newEmail: e.target.value })
    }
    handleNewPasswordChange = (e) => {
        this.setState({ newPassword: e.target.value })
    }
    handleNewUserSubmit = async (e) => {
        e.preventDefault();
        const user = await signUpUser(this.state.newEmail, this.state.newPassword);
        const token = user.token;
        this.props.handleUserChange(token);
        this.props.history.push('/cocktail-search');
    }

    render() {
        console.log(this.state);
        return (
            <div className='log-in-pg'>
                <form onSubmit={this.handleRetUserSubmit}>
                    <h3>RETURNING USERS PLEASE LOG IN </h3>
                    <p>Enter your email address and password and we can get your list of favorite cocktails and searching for more!</p>
                    <label>
                        Email Address:
                        <input value={this.state.returningEmail}
                            onChange={this.handleRetEmailChange} /> <br />
                    </label>
                    <label>
                        Password:
                        <input value={this.state.returningPassword}
                            onChange={this.handleRetPasswordChange} />
                    </label><br />
                    <button>Log In!</button>
                </form>

                <form onSubmit={this.handleNewUserSubmit}>
                    <h3>NEW USERS PLEASE SIGN UP! </h3>
                    <p>Simply enter an email and address to create your account then you can start searching for cocktails right away!</p>
                    <label>
                        Email Address:
                        <input value={this.state.newEmail}
                            onChange={this.handleNewEmailChange} />
                    </label>
                    <label>
                        Password:
                        <input value={this.state.newPassword}
                            onChange={this.handleNewPasswordChange} />
                    </label><br />
                    <button>Sign Up!</button>
                </form>

            </div>
        )
    }
}
