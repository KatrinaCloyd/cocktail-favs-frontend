import React, { Component } from 'react'
import { getUserFavs, deleteFave } from './api-utils.js'


export default class FavoritesList extends Component {
    state = {
        favorites: []
    }

    componentDidMount = async () => {
        await this.getFavs();
    }

    getFavs = async () => {
        const favs = await getUserFavs(this.props.token);
        this.setState({ favorites: favs })
    }

    removeFromFavs = async (drinkID) => {
        await deleteFave(drinkID, this.props.token);
        await this.getFavs();
    }

    render() {
        return (
            <div className='drink-list'>
                <h2>Here is your favorites list</h2>
                <div className='drink-list'>
                    {this.state.favorites.map(drink =>
                        <div key={drink.drink_id} className='drink-card'>
                            <h4 className='drink-name'>{drink.name}</h4>
                            <h5>A Favorite!</h5>
                            <button onClick={() => this.removeFromFavs(drink.drink_id)}>Remove From Favs</button>
                            <button>See Full Recipe</button>
                            <img className='drink-img' src={drink.image} alt='cocktail' />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
