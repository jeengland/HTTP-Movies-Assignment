import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const UpdateMovie = ({ movieList, setUpdated }) => {
    const history = useHistory();
    const [state, setState] = useState({title: '', director: '', metascore: undefined, newStar: '', stars: []})
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const {newStar, ...newState} = state;
        axios
            .post(`http://localhost:5000/api/movies/`, newState)
            .then(() => {
                setUpdated(true)
                history.push('/')
              })
            .catch((error) => console.error(`${error.response.status}: ${error.response.statusText}`))
    }
    const addStar = () => {
        setState({
            ...state,
            stars: [...state.stars, state.newStar],
            newStar: '',
        })
    }
    const deleteStar = (index) => {
        setState({
            ...state,
            stars: [...state.stars.slice(0, index), ...state.stars.slice(index + 1)]
        })
    }
    return (
        <form className='movie-card save-wrapper' onSubmit={handleSubmit}>
            <div className='form-row'>
                <label htmlFor='title'>Title:</label>
                <input type='text' name='title' id='title' value={state.title} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label htmlFor='director'>Director:</label>
                <input type='text' name='director' id='director' value={state.director} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label htmlFor='metascore'>Metascore:</label>
                <input type='number' name='metascore' id='metascore' value={state.metascore} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label htmlFor='newStar'>Stars:</label>
                <input type='text' name='newStar' id='newStar' value={state.newStar} onChange={handleChange} />
                <button type='button' className='star-button' onClick={addStar}>Add Star</button>
            </div>
            <ul className='stars-list'>
                {state.stars.map((star, index) => {
                    return (
                        <li key={index}>{star}&nbsp;<button className='delete-star' type='button' onClick={() => deleteStar(index)}>X</button></li>
                    )
                })}   
            </ul>
            <input type='submit' />
        </form>
    )
}

export default UpdateMovie;