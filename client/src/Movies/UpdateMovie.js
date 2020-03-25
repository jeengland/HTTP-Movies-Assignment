import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateMovie = ({ movieList }) => {
    const { id } = useParams();
    const movie = movieList.find((movie) => movie.id === parseInt(id));
    const [state, setState] = useState({title: '', director: '', metascore: undefined, newStar: '', stars: []})
    useEffect(() => {
        if (movie) {
            setState({
                ...state,
                title: movie.title, 
                director: movie.director, 
                metascore: movie.metascore, 
                stars: movie.stars
            })
        }
    }, [movie])
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }
    const addStar = (event) => {
        setState({
            ...state,
            stars: [...state.stars, state.newStar],
            newStar: '',
        })
    }
    return (
        <form>
            <div className='form-row'>
                <label htmlFor='title'>Title:</label>
                <input type='text' name='title' id='title' value={state.title} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label htmlFor='director'>Director</label>
                <input type='text' name='director' id='director' value={state.director} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label htmlFor='metascore'>Metascore:</label>
                <input type='number' name='metascore' id='metascore' value={state.metascore} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label htmlFor='newStar'>Stars:</label>
                <input type='text' name='newStar' id='newStar' value={state.newStar} onChange={handleChange} />
                <button type='button' onClick={addStar}>Add Star</button>
            </div>
            <ul className='stars-list'>
                {state.stars.map((star) => {
                    return (
                        <li>{star}&nbsp;<button type='button' >X</button></li>
                    )
                })}   
            </ul>
        </form>
    )
}

export default UpdateMovie;