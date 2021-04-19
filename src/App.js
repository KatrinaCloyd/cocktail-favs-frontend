import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute.js';
import Header from './Header.js'
import Home from './Home.js'
import LoginSignUpPage from './LoginSignUpPage.js'
import CocktailSearch from './CocktailSearch.js'
import FavoritesList from './FavoritesList.js'
import FavoriteDetailPage from './FavoriteDetailPage.js'
import './App.css';
import { getLocalStorage, setLocalStorage } from './local-storage-utils.js'

export default class App extends Component {

  state = {
    token: getLocalStorage()
    // token: ''
  }

  handleUserChange = (token) => {
    this.setState({ token: token })
    setLocalStorage(token);
  }

  handleLogout = () => {
    this.handleUserChange();
  }


  render() {
    return (
      <div>
        <Router>
          <Header
            token={this.state.token} handleLogout={this.handleLogout} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) =>
                <Home {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) =>
                <LoginSignUpPage handleUserChange={this.handleUserChange} {...routerProps} />}
            />
            <PrivateRoute
              path="/cocktail-search"
              exact
              token={this.state.token}
              render={(routerProps) =>
                <CocktailSearch token={this.state.token} {...routerProps} />}
            />
            <PrivateRoute
              path="/favorite"
              exact
              token={this.state.token}
              render={(routerProps) =>
                <FavoritesList token={this.state.token} {...routerProps} />}
            />
            <Route
              path="/favorite-detail/:id"
              exact
              render={(routerProps) =>
                <FavoriteDetailPage {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}