import React, { Component } from 'react'
import { searchByName, searchByIng, addFavorite, getUserFavs } from './api-utils.js'
import './search-page.css'


export default class CocktailSearch extends Component {
    state = {
        results: [],
        nameSearch: '',
        ingSearch: '',
        error: '',
        favorites: []
    }

    componentDidMount = async () => {
        await this.getFavs();
    }

    getFavs = async () => {
        const favs = await getUserFavs(this.props.token);
        this.setState({ favorites: favs })
    }

    handleNameSearchChange = (e) => {
        this.setState({ nameSearch: e.target.value, ingSearch: '' })
    }
    handleIngSearchChange = (e) => {
        this.setState({ ingSearch: e.target.value, nameSearch: '' })
    }
    handleNameSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const items = await searchByName(this.state.nameSearch);
            this.checkForNoResults(items);
        } catch {
            this.setState({ error: 'Ooops... something went wrong.' })
        }
    }

    checkForNoResults = (items) => {
        if (items === {} || !items.drinks) { this.setState({ error: 'Ooops... something went wrong. Try again.' }) }
        else this.setState({ results: items.drinks, error: '' });
    }

    handleIngSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const items = await searchByIng(this.state.ingSearch);
            this.checkForNoResults(items);
        } catch {
            this.setState({ error: 'Ooops... something went wrong.' })
        }
    }

    hasmaining = (drink) => {
        if (!drink.strIngredient1) { return this.state.ingSearch }
        else return drink.strIngredient1;
    }

    handleAddToFavsClick = async (drink) => {
        const mainIng = this.hasmaining(drink);
        await addFavorite(drink.strDrink, drink.idDrink, drink.strDrinkThumb, mainIng, this.props.token);

        await this.getFavs();
    }

    alreadyAFav = (drinkId) => {
        const isFaved = this.state.favorites.find(fav => fav.drink_id === Number(drinkId));
        return isFaved;
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
                            {this.alreadyAFav(drink.idDrink) ?
                                <h5>A Favorite!</h5> :
                                <button onClick={() => this.handleAddToFavsClick(drink)}>Save to Favs</button>}

                            <img className='drink-img' src={drink.strDrinkThumb} alt='cocktail' />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
