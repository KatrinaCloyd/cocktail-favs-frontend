import request from 'superagent';
const URL = 'https://cocktail-backend321321.herokuapp.com/';
const API = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function signInUser(email, password) {
    const response = await request
        .post(`${URL}auth/signin`)
        .send({ email: email, password: password })

    return response.body;
}

export async function signUpUser(email, password) {
    const response = await request
        .post(`${URL}auth/signup`)
        .send({ email: email, password: password })

    return response.body;
}

export async function getUserFavs(token) {
    const response = await request
        .get(`${URL}api/favorites`)
        .set('Authorization', token)

    return response.body;
}

export async function addFavorite(name, drink_id, image, mainIng, token) {
    const response = await request
        .post(`${URL}api/favorites`)
        .send({ name: name, drink_id: drink_id, image: image, mainingredient: mainIng, token })
        .set('Authorization', token)

    return response.body;
}

export async function deleteFave(favId, token) {
    const response = await request
        .delete(`${URL}api/favorites/${favId}`)
        .set('Authorization', token)

    return response.body;
}

export async function searchByName(search) {
    const response = await request
        .get(`${API}filter.php?i=${search}`)

    return response.body;
}

export async function searchByIng(search) {
    const response = await request
        .get(`${API}lookup.php?i=${search}`)

    return response.body;
}