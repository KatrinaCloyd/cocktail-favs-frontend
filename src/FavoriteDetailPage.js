import React, { Component } from 'react'
import { searchForSingeDrink } from './api-utils.js'

export default class FavoriteDetailPage extends Component {
    state = {
        drink: ''
    }

    componentDidMount = async () => {
        const favDrink = await searchForSingeDrink(this.props.match.params.id);
        this.setState(favDrink)
    }


    render() {
        console.log(this.state)
        return (
            <div className='recipe'>
                <h3>Full Recipe For a {this.state.strDrink}</h3>
                <img className='recipe-img' src={this.state.strDrinkThumb} alt='cocktail' />
                <h4>Ingredients:</h4>
                <ul>
                    {this.state.strIngredient1 ? <li>{this.state.strIngredient1}</li> : ''}
                    {this.state.strIngredient2 ? <li>{this.state.strIngredient2}</li> : ''}
                    {this.state.strIngredient3 ? <li>{this.state.strIngredient3}</li> : ''}
                    {this.state.strIngredient4 ? <li>{this.state.strIngredient4}</li> : ''}
                    {this.state.strIngredient5 ? <li>{this.state.strIngredient5}</li> : ''}
                    {this.state.strIngredient6 ? <li>{this.state.strIngredient6}</li> : ''}
                    {this.state.strIngredient7 ? <li>{this.state.strIngredient7}</li> : ''}
                    {this.state.strIngredient8 ? <li>{this.state.strIngredient8}</li> : ''}
                    {this.state.strIngredient9 ? <li>{this.state.strIngredient9}</li> : ''}
                </ul>
                <p>{this.state.strInstructions}</p>
            </div>
        )
    }
}
