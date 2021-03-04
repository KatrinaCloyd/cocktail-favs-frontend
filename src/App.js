import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Header from './Header.js'
import Home from './Home.js'
import LoginSignUpPage from './LoginSignUpPage.js'
import CocktailSearch from './CocktailSearch.js'
import FavoritesList from './FavoritesList.js'
import FavoriteDetailPage from './FavoriteDetailPage.js'
import './App.css';

export default class App extends Component {

  handleLogout = () => {
    this.handleUserChange();
  }

  render() {
    return (
      <div>
        <Router>
          <Header handleLogout={this.handleLogout} />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => <LoginSignUpPage {...routerProps} />}
            />
            <Route
              path="/cocktail-search"
              exact
              render={(routerProps) => <CocktailSearch {...routerProps} />}
            />
            <Route
              path="/favorite"
              exact
              render={(routerProps) => <FavoritesList {...routerProps} />}
            />
            <Route
              path="/favorite-detail"
              exact
              render={(routerProps) => <FavoriteDetailPage {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}