import React, { Component } from 'react'
import { searchByName, searchByIng } from './api-utils.js'
import './search-page.css'


export default class CocktailSearch extends Component {
    state = {
        results: [],
        nameSearch: '',
        ingSearch: '',
        error: ''
    }

    handleNameSearchChange = (e) => {
        this.setState({ nameSearch: e.target.value })
    }
    handleIngSearchChange = (e) => {
        this.setState({ ingSearch: e.target.value })
    }
    handleNameSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const items = await searchByName(this.state.nameSearch);
            this.setState({ results: items.drinks });
        } catch {
            this.setState({ error: 'Ooops... something went wrong.' })
        }
    }

    handleIngSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const items = await searchByIng(this.state.ingSearch);
            this.setState({ results: items.drinks });
        } catch {
            this.setState({ error: 'Ooops... something went wrong.' })
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className='log-in-pg'>
                    <form onSubmit={this.handleNameSearchSubmit}>
                        <h3>Search by cocktail <br /> NAME</h3>
                        {this.state.error && <h4> {this.state.error}</h4>}
                        <label>
                            Name:
                        <input value={this.state.nameSearch}
                                onChange={this.handleNameSearchChange} /> <br />
                        </label>
                        <button>Search!</button>
                    </form>

                    <form onSubmit={this.handleIngSearchSubmit}>
                        <h3>Search by cocktail <br /> INGREDIENT</h3>
                        {this.state.error && <h4> {this.state.error}</h4>}
                        <label>
                            Ingredient:
                        <input value={this.state.ingSearch}
                                onChange={this.handleIngSearchChange} />
                        </label>
                        <button>Search!</button>
                    </form>

                </div>
                <div className='drink-list'>
                    {!this.state.results.length && <h2>Enter something above to get started!</h2>}
                    {(this.state.results.length > 1) && <h2> Here are your search results:</h2>}
                </div>
                <div className='drink-list'>
                    {this.state.results.map(drink =>
                        <div key={drink.idDrink} className='drink-card'>
                            <h4 className='drink-name'>{drink.strDrink}</h4>
                            <button>Heart</button>
                            <img className='drink-img' src={drink.strDrinkThumb} alt='cocktail' />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
